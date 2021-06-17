import React, { useState } from "react";
import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, close } from "ionicons/icons";

import { gameStats } from "../data/gameData";
import { player } from "../data/playerData";

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState<string>("");
  const [showAddPlayerAlert, setShowAddPlayerAlert] = useState(false);

  function addPlayer() {
    if (newName != "") {
      var newPlayer = { name: newName, playedGames: 0, won: 0, lost: 0 };
      player.push(newPlayer);

      setNewName("");
      setShowModal(false);
    } else {
      setShowAddPlayerAlert(true);
    }
  }

  var addPlayerForm = true;

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
            <IonButton
              slot="end"
              fill="outline"
              onClick={() => setShowModal(true)}
            >
              <IonIcon icon={add} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        {addPlayerForm ? (
          <IonContent>
            <IonTitle>
              {player.map((p: any, i: number) => (
                <IonButton key={i} size="small">
                  {p.name}
                  <IonIcon icon={close} />
                </IonButton>
              ))}
              <IonInput
                type="text"
                placeholder="Spielername"
                onIonChange={(e) => setNewName(e.detail.value!)}
              ></IonInput>
              <IonButton
                fill="outline"
                onClick={() => addPlayer()}
                type="submit"
              >
                <IonIcon icon={add} />
              </IonButton>
            </IonTitle>
          </IonContent>
        ) : (
          <IonList>
            {player.map((p: any, i: any) => (
              <IonItem key={i}>{p.name}</IonItem>
            ))}
          </IonList>
        )}
      </IonContent>

      <IonModal isOpen={showModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Neuer Spieler</IonTitle>
            <IonButton
              slot="end"
              fill="outline"
              size="small"
              onClick={() => setShowModal(false)}
            >
              Abbrechen
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonTitle>
          <IonInput
            type="text"
            placeholder="Spielername"
            onIonChange={(e) => setNewName(e.detail.value!)}
          ></IonInput>
          <IonButton fill="outline" onClick={() => addPlayer()}>
            <IonIcon icon={add} />
          </IonButton>
        </IonTitle>
      </IonModal>
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

export default Home;
