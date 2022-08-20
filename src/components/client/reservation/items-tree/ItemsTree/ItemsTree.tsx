import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined'
import TreeItem, { treeItemClasses, TreeItemProps } from '@mui/lab/TreeItem'
import TreeView from '@mui/lab/TreeView'
import { alpha, styled } from '@mui/material/styles'
import Error from 'Components/generic/Error'
import { ErrorMessage, useField } from 'formik'
import { ReservationItem, ReservationItemCategory, ReservationType } from 'LocalTypes'
import React, { useMemo, useState } from 'react'
import CategoryItem from '../CategoryItem'
import Item from '../Item'
import { Provider as ReservationTypeProvider } from '../ReservationTypeContext'
import SelectableItem from '../SelectableItem'
import getSubcategoriesAndItems from './utils/getSubcategoriesAndItems'

const StyledTreeItem = styled((props: TreeItemProps) => (
  <TreeItem {...props}/>
))(({ theme }) => ({
  [`& .${treeItemClasses.content}:not(.${treeItemClasses.selected}):hover`]: {
    backgroundColor: 'transparent',
  },
  [`& .${treeItemClasses.content}`]: {
    paddingBottom: 5,
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 19,
    paddingLeft: 15,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}))

export type StructuredCategory = ReservationItemCategory & {
  subcategories: StructuredCategory[],
  items: ReservationItem[],
}

const renderStructuredCategory = ({ id, title, items, subcategories }: StructuredCategory) => (
  <StyledTreeItem ContentComponent={CategoryItem} key={id} nodeId={id} label={title}>
    {subcategories.map(category => (
      <React.Fragment key={category.id}>
        {renderStructuredCategory(category)}
      </React.Fragment>
    ))}
    {items.map(({ id, title, code, price, busy }) => (
      <StyledTreeItem ContentComponent={SelectableItem} key={id} nodeId={id} disabled={busy}
                      title={busy ? 'Položka je rezervovaná' : undefined}
                      label={<Item title={title} code={code} price={price}/>}/>
    ))}
  </StyledTreeItem>
)

type Props = {
  categories: ReservationItemCategory[],
  items: ReservationItem[],
  reservationType: ReservationType,
}
const itemsName = 'itemIds'

const ItemsTree = ({ categories, items, reservationType }: Props) => {
  const structuredCategories: StructuredCategory[] = useMemo(() => categories.filter(({ parent_id }) => !parent_id).map(category => getSubcategoriesAndItems(category, categories, items)), [ categories, items ])
  const [ selectedItemIds, setSelectedItemIds ] = useState<Set<string>>(new Set())
  const [ , , { setValue } ] = useField(itemsName)

  const onSelect = (event: React.SyntheticEvent, selectedItemIds: string[]) =>
    setSelectedItemIds(itemIdsSet => {
      selectedItemIds.forEach(id => {
        itemIdsSet.has(id) ? itemIdsSet.delete(id) : itemIdsSet.add(id)
      })

      setValue(Array.from(itemIdsSet))

      return new Set(itemIdsSet)
    })

  return (
    <ReservationTypeProvider value={reservationType}>
      <TreeView
        aria-label="customized"
        defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon/>}
        defaultExpandIcon={<AddBoxOutlinedIcon/>}
        defaultEndIcon={<CheckBoxOutlineBlankIcon/>}
        multiSelect
        onNodeSelect={onSelect}
        selected={Array.from(selectedItemIds)}
      >
        {structuredCategories.map(category => (
          <React.Fragment key={category.id}>
            {renderStructuredCategory(category)}
          </React.Fragment>
        ))}
      </TreeView>
      <ErrorMessage name={itemsName} component={Error}/>
    </ReservationTypeProvider>
  )
}

export default ItemsTree