






















import React, { createRef, forwardRef, useRef, useState } from "react";
import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, checkmark, close } from "ionicons/icons";

import { playerData } from "../data/data";

const AddPlayer: React.FC = () => {
  const [newName, setNewName] = useState<string>("");
  const [showAddPlayerAlert, setShowAddPlayerAlert] = useState(false);

  function addPlayer() {
    if (newName != "" && newName != "YgNpvEkg=Q&nWN9Y7^cwma2axGs5u6CFKCF-$*$PbB7M?vFWBQ#kBH9=WzDUd6R!Eq=9298=7C5BdLW%FN_CcPDcG9g8^5vDGuLc") {
      var newPlayer = { name: newName, playedGames: 0, won: 0, lost: 0 };
      playerData.push(newPlayer);

      setNewName("");
    } else {
      setNewName("");
      setShowAddPlayerAlert(true);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Beerpong Stats</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Beerpong Stats</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="playerListButtons">
            {playerData.map((p: any, i: number) => (
              <IonButton
                key={i}
                size="small"
                onClick={() => (
                  playerData.splice(i, 1), setNewName("YgNpvEkg=Q&nWN9Y7^cwma2axGs5u6CFKCF-$*$PbB7M?vFWBQ#kBH9=WzDUd6R!Eq=9298=7C5BdLW%FN_CcPDcG9g8^5vDGuLc")
                )}
              >
                {p.name}
                <IonIcon icon={close} />
              </IonButton>
            ))}
          </div>

          <div className="addPlayerForm">
            <IonInput         
              type="text"
              placeholder="Spielername"
              onIonChange={(e) => setNewName(e.detail.value!)}
            ></IonInput>
            <IonButton fill="outline" onClick={() => addPlayer()} type="submit">
              <IonIcon icon={add} />
            </IonButton>
          </div>
          <div className="playerFormSubmit">
            <IonButton
              color="success"
              size="large"
              routerLink="/home"
            >
              <IonIcon icon={checkmark}></IonIcon>
            </IonButton>
          </div>
        </IonContent>
      </IonContent>

      <IonAlert
        isOpen={showAddPlayerAlert}
        onDidDismiss={() => setShowAddPlayerAlert(false)}
        header={"Fehler"}
        message={"Bitte gib einen Spielernamen ein!"}
        buttons={["OK"]}
      />
    </IonPage>
  );
};

export default AddPlayer;
