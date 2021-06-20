import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, arrowForwardCircle, code } from "ionicons/icons";

import "./tournament.css";
import { playerData, gameStats } from "../data/data";

const Tournament: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAddPlayerAlert, setShowAddPlayerAlert] = useState(false);

  const [curRound, setCurRound] = useState<any>([0, 0]);
  const [winner, setWinner] = useState<any>("");

  const [removeTeam, setRemoveTeam] = useState([]);

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

  function addGame() {
    var newGame = {
      red: teams[curRound[0]].map((r: any, i: number) => r),
      blue: teams[curRound[1]].map((r: any, i: number) => r),
      won: winner,
    };
    gameStats.unshift(newGame);

    if (winner == "red") {
      teams[curRound[0]].map(
        (r: any, i: number) => (
          playerData[r].won++, playerData[r].playedGames++
        )
      );
      teams[curRound[1]].map(
        (r: any, i: number) => (
          playerData[r].lost++, playerData[r].playedGames++
        )
      );
      setRemoveTeam(removeTeam.concat(curRound[1]));
    } else {
      teams[curRound[0]].map(
        (r: any, i: number) => (
          playerData[r].lost++, playerData[r].playedGames++
        )
      );
      teams[curRound[1]].map(
        (r: any, i: number) => (
          playerData[r].won++, playerData[r].playedGames++
        )
      );
      setRemoveTeam(removeTeam.concat(curRound[0]));
    }
    console.log(removeTeam);

    setShowModal(false);
  }

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
                {teams[r[0]].map((t: any, ii: number) => (
                  <div key={ii}>{playerData[t].name}</div>
                ))}
              </IonLabel>
              <IonLabel slot="start" color="danger">
                VS.
              </IonLabel>
              <IonLabel slot="start">
                {teams[r[1]].map((t: any, ii: number) => (
                  <div key={ii}>{playerData[t].name}</div>
                ))}
              </IonLabel>
              <IonButton
                fill="outline"
                slot="end"
                onClick={() => (setCurRound(r), setShowModal(true))}
              >
                <IonIcon icon={arrowForwardCircle} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      ) : null}
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
          <IonLabel color="danger">Rot:</IonLabel>
          <div className="selector">
            {teams[curRound[0]].map((r: any, i: number) => (
              <div key={i}>{playerData[r].name}</div>
            ))}
          </div>
          <br />
          <IonLabel color="tertiary">Blau:</IonLabel>
          <div className="selector">
            {teams[curRound[1]].map((r: any, i: number) => (
              <div key={i}>{playerData[r].name}</div>
            ))}
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
    </>
  );
};

export default Tournament;
