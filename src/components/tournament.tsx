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
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  add,
  arrowForwardCircle,
  checkmark,
  code,
  refresh,
} from "ionicons/icons";

import "./tournament.css";
import { playerData, gameStats } from "../data/data";

const Tournament: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [curRound, setCurRound] = useState<any>([0, 0]);
  const [winner, setWinner] = useState<any>("");

  const [removeTeam, setRemoveTeam] = useState<number[]>([]);

  const [state, setState] = useState(0);
  const [teams, setTeams] = useState([
    [0, 0],
    [0, 0],
  ]);
  const [rounds, setRounds] = useState([
    [0, 1, false],
    [2, 3, false],
  ]);

  function shuffle(array: any) {
    var tmp,
      current,
      top = array.length;
    if (top)
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    return array;
  }

  function newTeams() {
    var i = 0;
    const random = () => {
      if (i <= 20) {
        generateTeams();
        i++;
        setTimeout(random, 50);
      }
    };
    random();
  }

  function generateTeams() {
    if (playerData.length % 4 == 0) {
      const arr = [];
      for (let i = 0; i < playerData.length; i++) {
        arr.push(i);
      }
      const array = shuffle(arr);

      var teamList = [];
      for (let index = 0; index < array.length; index = index + 2) {
        const team = [array[index], array[index + 1]];
        teamList.push(team);
      }

      setTeams(teamList);
      setState(1);
    } else {
      setShowAlert(true);
    }
  }

  function generateRounds() {
    const arr = [];
    for (let i = 0; i < teams.length; i++) {
      arr.push(i);
    }
    const array = shuffle(arr);

    var roundList = [];
    for (let index = 0; index < array.length; index += 2) {
      const round = [array[index], array[index + 1], false];
      roundList.push(round);
    }

    setRounds(roundList);
    setState(2);
  }

  function addGame() {
    if (winner == "") {
      return;
    }

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
      setRemoveTeam([...removeTeam, curRound[1]]);
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
      setRemoveTeam([...removeTeam, curRound[0]]);
    }

    rounds.map((r: any, i: number) => r == curRound && (r[3] = true));

    setShowModal(false);
    setWinner("");
  }

  return (
    <>
      {state == 0 ? (
        <div className="forwardButton">
          <IonButton onClick={() => generateTeams()}>
            Teams generieren
          </IonButton>
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
            <IonButton
              onClick={() => newTeams()}
              fill="outline"
              color="secondary"
            >
              <IonIcon icon={refresh} />
            </IonButton>
            <br />
            <IonButton onClick={() => generateRounds()}>
              Runden erstellen
            </IonButton>
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
              {r[3] ? (
                <IonButton fill="outline" slot="end">
                  <IonIcon icon={checkmark} />
                </IonButton>
              ) : (
                <IonButton
                  fill="outline"
                  slot="end"
                  onClick={() => (setCurRound(r), setShowModal(true))}
                >
                  <IonIcon icon={arrowForwardCircle} />
                </IonButton>
              )}
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
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"Zu wenig Spieler"}
        message={
          "Frag doch noch ein paar Freunde, ob sie mitspielen wollen! ;)"
        }
        buttons={["OK"]}
      />
    </>
  );
};

export default Tournament;
