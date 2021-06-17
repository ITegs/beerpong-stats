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
  IonListHeader,
  IonModal,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, checkmark, close, podium } from "ionicons/icons";

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

  var addPlayerForm = false;

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
          <IonList inset={true}>
            <IonItem>
              <IonLabel slot="start">
                <strong>Name</strong>
              </IonLabel>
              <IonLabel slot="end" color="primary">
                <IonIcon icon={podium}></IonIcon>
              </IonLabel>
              <IonLabel slot="end" color="success">
                <IonIcon icon={checkmark}></IonIcon>{" "}
              </IonLabel>
              <IonLabel slot="end" color="danger">
                <IonIcon icon={close}></IonIcon>
              </IonLabel>
            </IonItem>
            {player.map((p: any, i: any) => (
              <IonItem key={i}>
                <IonLabel slot="start">{p.name}</IonLabel>
                <IonLabel slot="end" color="primary">
                  {p.playedGames}
                </IonLabel>
                <IonLabel slot="end" color="success">
                  {p.won}
                </IonLabel>
                <IonLabel slot="end" color="danger">
                  {p.lost}
                </IonLabel>
              </IonItem>
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
