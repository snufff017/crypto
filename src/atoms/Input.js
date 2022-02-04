import styled from 'styled-components'

const InputWrap = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 0 16px 75px;

    label {
        margin-bottom: 8px;
    }

    input {
        transition: all, 0.3s;
        border: 1px solid rgb(118, 118, 118);
        padding: 4px;
    }

    input:focus {
        outline: none;
        box-shadow: none;
        border: 1px solid rgb(130, 202, 157);
    }
`

const Input = ({
    type = 'text',
    min = '1',
    onChange = () => {},
    value = null,
    label = '',
}) => {
    return (
        <InputWrap>
            {label && <label>{label}</label>}    
            <input min={min} type={type} onChange={onChange} value={value}></input>
        </InputWrap>
    )
}

export default Input;