import { TableColumnLayout, ITableColumn, SimpleTableCell } from "azure-devops-ui/Table";
import { SettingsTableItem } from "./SettingsTable.models";
import * as React from "react";
import { Tooltip } from "azure-devops-ui/TooltipEx";
import { Toggle } from "azure-devops-ui/Toggle";
import { ObservableValue } from "azure-devops-ui/Core/Observable";


export function getColumnTemplate(): ITableColumn<SettingsTableItem>[] {
  
  const renderItemNameColumn = (rowIndex: number, columnIndex: number, tableColumn: ITableColumn<SettingsTableItem>, tableItem: SettingsTableItem) => {
    return (
      <SimpleTableCell
        columnIndex={columnIndex}
        tableColumn={tableColumn}
        key={"col-" + columnIndex}
        contentClassName="fontWeightSemiBold font-weight-semibold fontSizeM font-size-m scroll-hidden">
        <div className="flex-row scroll-hidden">
          <Tooltip overflowOnly={true}>
            <span className="text-ellipsis">{tableItem.columnName}</span>
          </Tooltip>
        </div>
      </SimpleTableCell>
    );
  };

  const renderItemToggleColumn = (rowIndex: number, columnIndex: number, tableColumn: ITableColumn<SettingsTableItem>, tableItem: SettingsTableItem) => {
    return (
      <SimpleTableCell
        columnIndex={columnIndex}
        tableColumn={tableColumn}
        key={"col-" + columnIndex}
        contentClassName="fontWeightSemiBold font-weight-semibold fontSizeM font-size-m scroll-hidden">
        <div className="flex-row scroll-hidden">
        <Toggle
              offText={"Hide"}
              onText={"Show"}
              checked={tableItem.isActive}
              onChange={(event, value) => {
                tableItem.isActive = value 
                }}
          />

        </div>
      </SimpleTableCell>
    );
  };


  let columns = [
    {
      columnLayout: TableColumnLayout.singleLinePrefix,
      id: "columnName",
      name: "Column",
      readonly: true,
      renderCell: renderItemNameColumn,
      onSize: onSize,
      width: new ObservableValue(-25),
      maxWidth: 200
    },
    {
      columnLayout: TableColumnLayout.singleLinePrefix,
      id: "state",
      name: "State",
      readonly: false,
      renderCell: renderItemToggleColumn,
      onSize: onSize,
      width: new ObservableValue(130),
      minWidth: 130,
      maxWidth: 300
    }
  ];

  function onSize(event: MouseEvent, index: number, width: number) {
    (columns[index].width as ObservableValue<number>).value = width;
  }

  return columns;
}