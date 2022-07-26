import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import { TreeItemContentProps, useTreeItem } from '@mui/lab/TreeItem'
import clsx from 'clsx'
import React from 'react'

const SelectableItem = React.forwardRef(function SelectableItem({
  classes,
  className,
  icon,
  expansionIcon,
  displayIcon,
  label,
  nodeId,
}: TreeItemContentProps, ref) {
  const {
    selected,
    disabled,
    handleSelection,
  } = useTreeItem(nodeId)

  return (
    <div className={clsx(className, classes.root, {
      [classes.disabled]: disabled,
    })} onMouseDown={handleSelection} ref={ref as React.Ref<HTMLDivElement>}>
      {selected ? <CheckBoxOutlinedIcon/> : <CheckBoxOutlineBlankIcon/>}
      {label}
    </div>
  )
})

export default SelectableItem