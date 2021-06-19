import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import { add, code } from "ionicons/icons";

import "./tournament.css";
import { playerData, gameStats } from "../data/data";

const Tournament: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAddPlayerAlert, setShowAddPlayerAlert] = useState(false);

  const [state, setState] = useState(0);
  const [teams, setTeams] = useState([
    [0, 1],
    [2, 3],
    [4, 5],
    [6, 7],
  ]);
  const [rounds, setRounds] = useState([
    [0, 1],
    [2, 3],
  ]);

  return (
    <>
      {state == 0 ? (
        <div className="forwardButton">
          <IonButton onClick={() => setState(1)}>Teams generieren</IonButton>
        </div>
      ) : state == 1 ? (
        <IonList inset={true}>
          {teams.map((t: any, i: number) => (
            <IonItem key={i}>
              <IonLabel slot="start" color="tertiary">
                Team {i + 1}:
              </IonLabel>
              {t.map((c: any, ii: number) => (
                <IonLabel key={ii}>{playerData[c].name}</IonLabel>
              ))}
            </IonItem>
          ))}
          <div className="forwardButton">
            <IonButton onClick={() => setState(2)}>Runden erstellen</IonButton>
          </div>
        </IonList>
      ) : state == 2 ? (
        <IonList inset={true}>
          {rounds.map((r: any, i: number) => (
            <IonItem key={i}>
              <IonLabel slot="start">
                {teams[r[0]].map(
                  (t: any, ii: number) => playerData[t].name + " "
                )}
              </IonLabel>
              <IonIcon icon={code} />
              <IonLabel slot="end">
                {teams[r[1]].map(
                  (t: any, ii: number) => playerData[t].name + " "
                )}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      ) : null}
    </>
  );
};

export default Tournament;
