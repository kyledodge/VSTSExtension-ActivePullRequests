import { Card } from "azure-devops-ui/Card";
import { ObservableArray, ObservableValue } from "azure-devops-ui/Core/Observable";
import { Table } from "azure-devops-ui/Table";
import * as React from "react";
import { SettingsTableProps, SettingsTableState, SettingsTableItem } from "./SettingsTable.models";
import { getColumnTemplate as getColumns } from "./SettingsTable.columns";
import * as SDK from "azure-devops-extension-sdk";
import { IExtensionDataManager, IExtensionDataService, CommonServiceIds } from "azure-devops-extension-api";

export class SettingsTable extends React.Component<SettingsTableProps, SettingsTableState> {
  private _dataManager?: IExtensionDataManager;
  
  constructor(props: SettingsTableProps) {
    super(props);

    this.state = {
      columns: getColumns(),
      settingsProvider: new ObservableArray<ObservableValue<SettingsTableItem>>(
        this.props.columnSettings || new Array(5).fill(new ObservableValue<SettingsTableItem>(undefined))
      )
    };
  }

  public componentDidMount() {
    this.initializeState();
}

private async initializeState(): Promise<void> {
    await SDK.ready();
    const accessToken = await SDK.getAccessToken();
    const extDataService = await SDK.getService<IExtensionDataService>(CommonServiceIds.ExtensionDataService);
    this._dataManager = await extDataService.getExtensionDataManager(SDK.getExtensionContext().id, accessToken);

    this.setColValue("asdf","asdf");
}

setColValue(key:string, value:string) {
  this._dataManager.getValue<string>("pullrequests-column-status").then((data) => { console.log("GETTING VALUE: "  + data)});
  
  var val = new Date().getMilliseconds().toString();
  this._dataManager!.setValue<string>("pullrequests-column-status", val).then(() => { console.log("SETTING VALUE TO: " + val)});

  this._dataManager.getValue<string>("pullrequests-column-status").then((data) => { console.log("GETTING VALUE: "  + data)});
}
  componentDidUpdate(prevProps: SettingsTableProps, prevState: SettingsTableState) {
    
  }

  render() {
    return (
      <Card className="flex-grow bolt-table-card" contentProps={{ contentPadding: false }} titleProps={{ text: "Pull Request Table Columns"}}>
        <Table columns={this.state.columns} itemProvider={this.state.settingsProvider} role="table" />
      </Card>
    );
  }
}