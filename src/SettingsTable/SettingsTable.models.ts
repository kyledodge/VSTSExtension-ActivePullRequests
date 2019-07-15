import { ITableColumn } from "azure-devops-ui/Table";
import { ObservableArray, ObservableValue } from "azure-devops-ui/Core/Observable";

export interface SettingsTableProps {
  columnSettings: SettingsTableItem[];
}

export interface SettingsTableState {
  columns: ITableColumn<SettingsTableItem>[];
  settingsProvider: ObservableArray<ObservableValue<SettingsTableItem>>;
}

export interface SettingsTableItem {
  id: number;
  columnName: string;
  isActive: boolean;
}