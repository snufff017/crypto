import styled from 'styled-components'

const ButtonWrap = styled.div`
    position: relative;
    margin-right: 16px;

    &:last-child {
        margin-right: 0;
    }

    button {
        border: none;
        padding: 0.2rem 0.6rem;
        width: ${props => (props.size === 'sm' ? '100px' : '160px')};
        font-size: 12px;
        line-height: 1.5;
        background-color: rgb(130, 202, 157);
        border-color: rgb(130, 202, 157);

        &:focus {
            outline: none;
            box-shadow: none;
        }       
    }
    
`

const Button = ({
    text='',
    onClick = () => {},
    disabled = false,
    size = 'md'

}) => {
    return (
        <ButtonWrap size={size} >
            <button disabled={disabled} onClick={onClick}>{text}</button>
        </ButtonWrap>
    )
}

export default Button;