import React, { useState, useEffect, useCallback } from "react";
import { isEqual } from "lodash";
import { GridStyled } from "./App.styled";
import Connector from "./Connector";

const Grid = React.memo(
  function GridView(props) {
    const [connectors, setConnectors] = useState([]);

    const newData = props["data-tray"];

    const add = useCallback(() => {
      setConnectors([...connectors, newData]);
    }, [connectors, newData]);

    useEffect(() => {
      add();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newData]);

    const onDragOver = useCallback((event) => {
      event.stopPropagation();
      event.preventDefault();
    }, []);

    return (
      <GridStyled onDragOver={onDragOver}>
        {connectors.map((data) => (
          <Connector
            key={`${data.connector.name}${data.coords.x}${data.coords.y}`}
            data={data}
            onDragStart={() => props.onEmitterDragStart(data)}
          />
        ))}
      </GridStyled>
    );
  },
  function shouldKeepPrev(prevProps, nextProps) {
    const MIN = 0;
    const MAX = 1000;
    const nextData = nextProps["data-tray"];
    const preData = prevProps["data-tray"];
    const isValid =
      !!nextData.connector &&
      !!nextData.coords &&
      !nextData.trayTrollSays &&
      nextData.coords.x >= MIN &&
      nextData.coords.x <= MAX &&
      nextData.coords.y >= MIN &&
      nextData.coords.y <= MAX;

    if (isEqual(nextData, preData) || !isValid) {
      return true;
    }

    return false;
  },
);

export default Grid;
