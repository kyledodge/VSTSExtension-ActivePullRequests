import * as React from "react";
import { Button } from "azure-devops-ui/Button";
import { Panel } from "azure-devops-ui/Panel";
import { SettingsTab } from "../SettingsTable/SettingsTab";
import { TitleSize, Header } from "azure-devops-ui/Header";

interface ISettingsPanelState {
    expanded: boolean;
}

export default class SettingsPanel extends React.Component<{}, ISettingsPanelState> {
    constructor(props: {}) {
        super(props);
        this.state = { expanded: true };
    }

    public render(): JSX.Element {
        return (
            <div>
                {this.state.expanded && (
                    <Panel
                        onDismiss={() => this.setState({ expanded: false })}
                        titleProps={{ text: "Extension Settings" }}
                        description={
                            "Modify settings for the All Active Pull Requests extension"
                        }
                        footerButtonProps={[
                            
                        ]}
                    >
                        
                            <SettingsTab />
                    </Panel>
                )}
            </div>
        );
    }
}