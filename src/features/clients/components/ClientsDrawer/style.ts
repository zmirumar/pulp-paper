import styled from "styled-components";

export const ClientDrawerStyled = styled.div`
.drawer-content {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s;
}

.form-group input:hover {
  border-color: #4096ff;
}

.form-group input:focus {
  border-color: #4096ff;
  box-shadow: 0 0 0 2px rgba(64, 150, 255, 0.1);
  outline: none;
}

.form-group input::placeholder {
  color: #bfbfbf;
}

.section-divider {
  height: 1px;
  background-color: #f0f0f0;
  margin: 8px 0;
}

.section-title {
  font-size: 14px;
  font-weight: 500;
  color: #262626;
  margin: 0 0 12px 0;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-group .ant-checkbox-wrapper {
  margin-left: 0;
}

.form-group .ant-checkbox-wrapper {
  font-size: 14px;
  color: #262626;
}



`