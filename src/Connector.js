import React from "react";
import { isEqual } from "lodash";
import { ConnectorStyled, ConnectorImageStyled } from "./App.styled";

const Connector = React.memo(
  ({ data, onDragStart }) => (
    <ConnectorStyled
      x={data.coords.x}
      y={data.coords.y}
      draggable={onDragStart ? true : false}
      onDragStart={onDragStart}
    >
      <span>{data.connector.name}</span>
      <ConnectorImageStyled
        src={data.connector.iconURL}
        alt={data.connector.name}
      />
    </ConnectorStyled>
  ),
  (prevProps, nextProps) =>
    isEqual(prevProps.data, nextProps.data) ? true : false,
);

Connector.displayName = "Connector";

export default Connector;
