import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { find } from "lodash";
import EventEmitter from "@trayio/builder-squad-event-emitter";
import {
  InterestingConnectorListStyled,
  HeaderStyled,
  AppStyled,
} from "./App.styled";
import Connector from "./Connector";
import Grid from "./Grid";

const timeStart = moment();

function App() {
  const [draggedEmitter, setDraggedEmitter] = useState();
  const [interestingConnectors, setInterestingConnectors] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState();

  const onDragOver = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
  }, []);

  // TODO needs unit tests
  const onDrop = useCallback(() => {
    if (find(interestingConnectors, draggedEmitter)) return;
    setInterestingConnectors([...interestingConnectors, draggedEmitter]);
  }, [interestingConnectors, draggedEmitter]);

  // TODO needs unit tests
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeElapsed(
        moment.utc(moment().diff(timeStart)).format("HH:mm:ss.SS"),
      );
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeElapsed]);

  return (
    <AppStyled>
      <HeaderStyled>
        <h1>Agata's visualizer</h1>
        <h2>{timeElapsed}</h2>
      </HeaderStyled>

      <EventEmitter>
        <Grid onEmitterDragStart={setDraggedEmitter} />
      </EventEmitter>

      <InterestingConnectorListStyled
        droppable
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {interestingConnectors.map((data) => (
          <Connector
            data={data}
            key={`${data.connector.name}${data.coords.x}${data.coords.y}`}
          />
        ))}
      </InterestingConnectorListStyled>
    </AppStyled>
  );
}

export default App;
