import styled from "styled-components";
import { Modal } from 'antd';

export const DeleteSortStyled = styled(Modal)`
    .modal_cont{
        border-radius: 8px;
        padding: 10px 15px;
        color: #fff;
        background-color: var(--color-primary);
        border: none;
    }
    .modal_stop{
        margin-right: 8px;
        border-radius: 8px;
        padding: 10px 15px;
        color: #333;
        background-color: #fff;
        border: 1px solid #393939ff;
    }`