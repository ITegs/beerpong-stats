import React, { useEffect, useState } from "react";
import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  add,
  arrowDown,
  arrowUp,
  checkmark,
  close,
  podium,
} from "ionicons/icons";

import "./Home.css";

import { playerData, gameStats } from "../data/data";
import { Redirect } from "react-router";

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState<string>("");
  const [showAddPlayerAlert, setShowAddPlayerAlert] = useState(false);
  const [showPlayer, setShowPlayer] = useState(true);

  function addPlayer() {
    if (newName != "") {
      var newPlayer = { name: newName, playedGames: 0, won: 0, lost: 0 };
      playerData.push(newPlayer);

      setNewName("");
      setShowModal(false);
    } else {
      setShowAddPlayerAlert(true);
    }
  }

  function redirect() {
    if (playerData.length == 0) {
      return <Redirect to="/addPlayer" />;
    }
  }

  return (
    <IonPage>
      {redirect()}
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

        <IonList inset={true}>
          <IonItem>
            <div className="listHeader">
              <IonLabel slot="start" color="primary">
                Spieler
              </IonLabel>
            </div>

            <IonButton
              slot="end"
              fill="clear"
              onClick={() => setShowPlayer(!showPlayer)}
            >
              {showPlayer ? (
                <IonIcon icon={arrowUp} />
              ) : (
                <IonIcon icon={arrowDown} />
              )}
            </IonButton>
          </IonItem>

          {showPlayer ? (
            <IonList lines="none">
              <IonItem>
                <IonLabel slot="start">
                  <strong>Name</strong>
                </IonLabel>
                <IonLabel slot="end" color="primary">
                  <IonIcon icon={podium}></IonIcon>
                </IonLabel>
                <IonLabel slot="end" color="success">
                  <IonIcon icon={checkmark}></IonIcon>
                </IonLabel>
                <IonLabel slot="end" color="danger">
                  <IonIcon icon={close}></IonIcon>
                </IonLabel>
              </IonItem>
              {playerData.map((p: any, i: number) => (
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
          ) : null}

          <IonItem>
            <div className="listHeader">
              <IonLabel slot="start" color="primary">
                Gespielte Spiele
              </IonLabel>
            </div>
          </IonItem>
          <IonList>
            <IonItem>
              <IonLabel slot="start" color="danger">
                Rot
              </IonLabel>
              <IonLabel slot="end" color="primary">
                Blau
              </IonLabel>
            </IonItem>
            {gameStats.map((g: any, i: number) =>
              g.won === "red" ? (
                <IonItem key={i}>
                  <IonLabel slot="start" color="success">
                    {g.red.map((c: any, ii: number) => (
                      <IonLabel key={ii}>{playerData[ii].name}</IonLabel>
                    ))}
                  </IonLabel>
                  <IonLabel slot="end" color="danger">
                    {g.blue.map((c: any, ii: number) => (
                      <IonLabel key={ii}>{playerData[ii].name}</IonLabel>
                    ))}
                  </IonLabel>
                </IonItem>
              ) : (
                <IonItem key={i}>
                  <IonLabel slot="start" color="danger">
                    {g.red.map((c: any, ii: number) => (
                      <IonLabel key={ii}>{playerData[ii].name}</IonLabel>
                    ))}
                  </IonLabel>
                  <IonLabel slot="end" color="success">
                    {g.blue.map((c: any, ii: number) => (
                      <IonLabel key={ii}>{playerData[ii].name}</IonLabel>
                    ))}
                  </IonLabel>
                </IonItem>
              )
            )}
          </IonList>
        </IonList>
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
