import { TreeItemContentProps, useTreeItem } from '@mui/lab/TreeItem'
import clsx from 'clsx'
import React from 'react'

const CategoryItem = React.forwardRef(function CategoryItem({
  classes,
  className,
  icon,
  expansionIcon,
  displayIcon,
  label,
  nodeId,
}: TreeItemContentProps, ref) {
  const {
    disabled,
    expanded,
    handleExpansion,
    preventSelection,
  } = useTreeItem(nodeId)

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    preventSelection(event)
    handleExpansion(event)
  }

  return (
    <div className={clsx(className, classes.root, {
      [classes.expanded]: expanded,
      [classes.disabled]: disabled,
    })} onMouseDown={handleMouseDown} ref={ref as React.Ref<HTMLDivElement>}>
      {icon || expansionIcon || displayIcon}
      {label}
    </div>
  )
})

export default CategoryItem