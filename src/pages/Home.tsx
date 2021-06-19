import React, { useState } from "react";
import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
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
import { Redirect } from "react-router";

import { playerData, gameStats } from "../data/data";
import Tournament from "../components/tournament";

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAddPlayerAlert, setShowAddPlayerAlert] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showGames, setShowGames] = useState(false);
  const [showTournament, setShowTournament] = useState(true);

  const [redTeam, setRedTeam] = useState([]);
  const [blueTeam, setBlueTeam] = useState([]);
  const [winner, setWinner] = useState<any>("");

  function addGame() {
    if (redTeam != []) {
      if (blueTeam != []) {
        var newGame = { red: redTeam, blue: blueTeam, won: winner };
        gameStats.unshift(newGame);

        if (winner == "red") {
          redTeam.map(
            (t: any, i: number) => (
              playerData[t].won++, playerData[t].playedGames++
            )
          );
          blueTeam.map(
            (t: any, i: number) => (
              playerData[t].lost++, playerData[t].playedGames++
            )
          );
        } else {
          redTeam.map(
            (t: any, i: number) => (
              playerData[t].lost++, playerData[t].playedGames++
            )
          );
          blueTeam.map(
            (t: any, i: number) => (
              playerData[t].won++, playerData[t].playedGames++
            )
          );
        }

        setShowModal(false);
      } else {
        setShowAddPlayerAlert(true);
      }
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
          </IonToolbar>
        </IonHeader>

        <IonList inset={true}>
          <IonItem>
            <IonButton
              slot="start"
              fill="outline"
              size="small"
              color="secondary"
              routerLink="/addPlayer"
            >
              <IonIcon icon={add} />
            </IonButton>
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
            <IonButton
              slot="start"
              fill="outline"
              size="small"
              color="secondary"
              onClick={() => setShowModal(true)}
            >
              <IonIcon icon={add} />
            </IonButton>
            <div className="listHeader">
              <IonLabel slot="start" color="primary">
                Gespielte Spiele
              </IonLabel>
            </div>

            <IonButton
              slot="end"
              fill="clear"
              onClick={() => setShowGames(!showGames)}
            >
              {showGames ? (
                <IonIcon icon={arrowUp} />
              ) : (
                <IonIcon icon={arrowDown} />
              )}
            </IonButton>
          </IonItem>
          {showGames ? (
            <IonList>
              <IonItem>
                <IonLabel slot="start" color="danger">
                  <strong>Rot</strong>
                </IonLabel>
                <IonLabel slot="end" color="primary">
                  <strong>Blau</strong>
                </IonLabel>
              </IonItem>
              {gameStats.map((g: any, i: number) =>
                g.won === "red" ? (
                  <IonItem key={i}>
                    <IonLabel slot="start" color="success">
                      {g.red.map((c: any, ii: number) => (
                        <IonLabel key={ii}>{playerData[c].name}</IonLabel>
                      ))}
                    </IonLabel>
                    <IonLabel slot="end" color="danger">
                      {g.blue.map((c: any, ii: number) => (
                        <IonLabel key={ii}>{playerData[c].name}</IonLabel>
                      ))}
                    </IonLabel>
                  </IonItem>
                ) : (
                  <IonItem key={i}>
                    <IonLabel slot="start" color="danger">
                      {g.red.map((c: any, ii: number) => (
                        <IonLabel key={ii}>{playerData[c].name}</IonLabel>
                      ))}
                    </IonLabel>
                    <IonLabel slot="end" color="success">
                      {g.blue.map((c: any, ii: number) => (
                        <IonLabel key={ii}>{playerData[c].name}</IonLabel>
                      ))}
                    </IonLabel>
                  </IonItem>
                )
              )}
            </IonList>
          ) : null}

          <IonItem>
            <IonButton
              slot="start"
              fill="outline"
              size="small"
              color="secondary"
              routerLink="/addPlayer"
            >
              <IonIcon icon={add} />
            </IonButton>
            <div className="listHeader">
              <IonLabel slot="start" color="primary">
                Meisterschaft
              </IonLabel>
            </div>

            <IonButton
              slot="end"
              fill="clear"
              onClick={() => setShowTournament(!showTournament)}
            >
              {showTournament ? (
                <IonIcon icon={arrowUp} />
              ) : (
                <IonIcon icon={arrowDown} />
              )}
            </IonButton>
          </IonItem>

          {showTournament ? <Tournament /> : null}
        </IonList>
      </IonContent>
      <IonModal isOpen={showModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Spiel eintragen</IonTitle>
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
        <div className="selectContainer">
          <IonLabel>Teams:</IonLabel>
          <div className="selector">
            <IonSelect
              placeholder="Team Rot"
              multiple={true}
              onIonChange={(e) => setRedTeam(e.detail.value)}
            >
              {playerData.map((p: any, i: number) => (
                <IonSelectOption key={i} value={i}>
                  {p.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </div>
          <div className="selector">
            <IonSelect
              placeholder="Team Blau"
              multiple={true}
              onIonChange={(e) => setBlueTeam(e.detail.value)}
            >
              {playerData.map((p: any, i: number) => (
                <IonSelectOption key={i} value={i}>
                  {p.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </div>
        </div>

        <div className="winnerContainer">
          <IonLabel>Gewinner Team:</IonLabel>
          <div className="winnerSegment">
            <IonSegment onIonChange={(e) => setWinner(e.detail.value)}>
              <IonSegmentButton value="red">
                <strong>Rot</strong>
              </IonSegmentButton>
              <IonSegmentButton value="blue">
                <strong>Blau</strong>
              </IonSegmentButton>
            </IonSegment>
          </div>
        </div>
        <div className="addGameButton">
          <IonButton fill="outline" size="large" onClick={() => addGame()}>
            <IonIcon icon={add} />
          </IonButton>
        </div>
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
