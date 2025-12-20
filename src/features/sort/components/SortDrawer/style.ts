import styled from "styled-components";

export const SortDrawerStyled = styled.div`
  h2 {
    font-size: 22px;
    font-weight: lighter;
    margin-bottom: 10px;
  }

  .ant-drawer-title {
    font-size: 25px;
  }

  .ant-input {
    padding: 11px;

    &:focus::placeholder {
      color: transparent !important;
    }
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    height: calc(4vh - 110px);
    justify-content: space-between;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .ant-modal {
    &-content {
      width: 400px !important;
    }
  }

  .ant-modal-root {
    .ant-modal-mask {
      background-color: rgba(0, 0, 0, 0.75) !important;
      backdrop-filter: blur(2px);
    }
  }

  .circle_outlined {
    color: #52c41a !important;
  }

  .succes_message {
    background-color: white !important;
  }
  .ant-select-selector{
    padding: 19px !important;
  }
`;
