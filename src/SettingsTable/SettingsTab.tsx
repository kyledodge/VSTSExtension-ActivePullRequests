import * as React from "react";
import * as SDK from "azure-devops-extension-sdk";
import { CommonServiceIds, IExtensionDataManager, IExtensionDataService } from "azure-devops-extension-api";
import { Toggle } from "azure-devops-ui/Toggle";
import { Button } from "azure-devops-ui/Button";
import { TextField } from "azure-devops-ui/TextField";
import { ButtonGroup } from "azure-devops-ui/ButtonGroup";

export interface IExtensionDataState {
    col1State?: boolean;
    persistedText?: string;
    ready?: boolean;
}

export class SettingsTab extends React.Component<{}, IExtensionDataState> {

    private _dataManager?: IExtensionDataManager;

    constructor(props: {}) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        this.initializeState();
    }

    private async initializeState(): Promise<void> {
        await SDK.ready();
        const accessToken = await SDK.getAccessToken();
        const extDataService = await SDK.getService<IExtensionDataService>(CommonServiceIds.ExtensionDataService);
        this._dataManager = await extDataService.getExtensionDataManager(SDK.getExtensionContext().id, accessToken);

        this._dataManager.getValue<string>("pullrequests-column-status").then((data) => {
            this.setState({
                col1State: data === "true" ? true : false,
                persistedText: data,
                ready: true
            });
        }, () => {
            this.setState({
                col1State: false,
                ready: true
            });
        });
    }

    public render(): JSX.Element {
        const { col1State, ready, persistedText } = this.state;

        return (
            <div className="flex-grow rhythm-vertical-8">
                <div className="flex-row settings-item">
                    <div className="font-size-mm font-weight-semibold flex-noshrink flex-grow">Column Display</div>
                </div>

                <div className="flex-row settings-item">
                    <div className="font-size-mm font-weight-semibold flex-noshrink flex-grow">Author</div>
                    <Toggle
                        offText={"Hide"}
                        onText={"Show"}
                        checked={true}
                        disabled={!ready}
                            />
                </div>

                <div className="flex-row settings-item">
                    <div className="font-size-mm font-weight-semibold flex-noshrink flex-grow">Created</div>
                    <Toggle
                        offText={"Hide"}
                        onText={"Show"}
                        checked={true}
                        disabled={!ready}
                            />
                </div>

                <div className="flex-row settings-item">
                    <div className="font-size-mm font-weight-semibold flex-noshrink flex-grow">Details</div>
                    <Toggle
                        offText={"Hide"}
                        onText={"Show"}
                        checked={true}
                        disabled={!ready}
                            />
                </div>

                <div className="flex-row settings-item">
                    <div className="font-size-mm font-weight-semibold flex-noshrink flex-grow">Repository</div>
                    <Toggle
                        offText={"Hide"}
                        onText={"Show"}
                        checked={true}
                        disabled={!ready}
                            />
                </div>

                <div className="flex-row settings-item">
                    <div className="font-size-mm font-weight-semibold flex-noshrink flex-grow">Comments</div>
                    <Toggle
                        offText={"Hide"}
                        onText={"Show"}
                        checked={true}
                        disabled={!ready}
                            />
                </div>

                <div className="flex-row settings-item">
                    <div className="font-size-mm font-weight-semibold flex-noshrink flex-grow">Build Status</div>
                    <Toggle
                        offText={"Hide"}
                        onText={"Show"}
                        checked={true}
                        disabled={!ready}
                            />
                </div>

                <div className="flex-row settings-item">
                    <div className="font-size-mm font-weight-semibold flex-noshrink flex-grow">My Vote</div>
                    <Toggle
                        offText={"Hide"}
                        onText={"Show"}
                        checked={col1State}
                        disabled={!ready}
                        onChange={(event, value) => {
                            this.onValueChanged(value);}}
                            />
                </div>

                <div className="flex-row settings-item">
                    <div className="font-size-mm font-weight-semibold flex-noshrink flex-grow">Reviewers</div>
                    <Toggle
                        offText={"Hide"}
                        onText={"Show"}
                        checked={true}
                        disabled={!ready}
                        />

                </div>

                <Button
                            text="Cancel"
                            onClick={() => this.dismiss()}
                        />
                        <Button
                            text="Save Changes"
                            primary={true}
                            onClick={() => this.saveChanges()}
                        />

            </div>
        );
    }

    private onValueChanged = (value: boolean): void => {
        this.setState({ col1State: value });
        this._dataManager!.setValue<string>("pullrequests-column-status", value.toString() || "").then(() => {
            this.setState({
                ready: true,
                persistedText: value.toString()
            });
        });
    }

    private dismiss() {
        const config = SDK.getConfiguration();
        if (config.dialog) {
            config.dialog.close(true);
        }
        else if (config.panel) {
            config.panel.close(true);
        }
    }

    private saveChanges() {
        console.log("redirecting...");
        window.location.reload(true);
    }

}