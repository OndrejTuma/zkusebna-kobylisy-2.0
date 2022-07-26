import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined'
import TreeItem, { treeItemClasses, TreeItemProps } from '@mui/lab/TreeItem'
import TreeView from '@mui/lab/TreeView'
import { alpha, styled } from '@mui/material/styles'
import { useField } from 'formik'
import { ReservationItem, ReservationItemCategory } from 'LocalTypes'
import React, { useMemo, useState } from 'react'
import CategoryItem from '../CategoryItem'
import Item from '../Item'
import SelectableItem from '../SelectableItem'
import getSubcategoriesAndItems from './utils/getSubcategoriesAndItems'

const StyledTreeItem = styled((props: TreeItemProps) => (
  <TreeItem {...props}/>
))(({ theme }) => ({
  [`& .${treeItemClasses.content}:not(.${treeItemClasses.selected}):hover`]: {
    backgroundColor: 'transparent',
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
    {items.map(({ id, title, code, price }) => (
      <StyledTreeItem ContentComponent={SelectableItem} key={id} nodeId={id}
                      label={<Item title={title} code={code} price={price}/>}/>
    ))}
  </StyledTreeItem>
)

type Props = {
  categories: ReservationItemCategory[],
  items: ReservationItem[]
}

const ItemsTree = ({ categories, items }: Props) => {
  const structuredCategories: StructuredCategory[] = useMemo(() => categories.filter(({ parent_id }) => !parent_id).map(category => getSubcategoriesAndItems(category, categories, items)), [ categories, items ])
  const [ selectedItemIds, setSelectedItemIds ] = useState<Set<string>>(new Set())
  const [ , , { setValue } ] = useField('items')

  const onSelect = (event: React.SyntheticEvent, selectedItemIds: string[]) =>
    setSelectedItemIds(itemIdsSet => {
      selectedItemIds.forEach(id => {
        itemIdsSet.has(id) ? itemIdsSet.delete(id) : itemIdsSet.add(id)
      })

      setValue(Array.from(itemIdsSet))

      return new Set(itemIdsSet)
    })

  return (
    <TreeView
      aria-label="customized"
      defaultExpanded={[ '1' ]}
      defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon/>}
      defaultExpandIcon={<AddBoxOutlinedIcon/>}
      defaultEndIcon={<CheckBoxOutlineBlankIcon/>}
      sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
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
  )
}

export default ItemsTree