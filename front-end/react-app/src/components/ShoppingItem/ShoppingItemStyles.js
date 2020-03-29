import styled from "styled-components";

export const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  width: 20rem;
  font-weight: bold;
  line-height: 24px;
  cursor: pointer;
  user-select: none;
`;

export const ItemText = styled.span`
  max-width: 75%;
  ${props => props.completed && "text-decoration: line-through"}
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const EditButton = styled.a`
  text-decoration: underline;
  font-weight: normal;
  margin: 0 10px;
`;

export const DeleteButton = styled.button`
  border: none;
  background: none;
  font-size: 22px;
  padding: 0;
  font-family: inherit;
`;
