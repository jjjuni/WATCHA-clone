import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as S from "../_style/page-style"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import useTitle from '../../hooks/useTitle';
import { LogContext } from '../../context/logContext'
import useCustionMutation from '../../hooks/useCustomMutation'

function SignUpPage() {
  const {
    isLogged,
  } = useContext(LogContext);

  const mutate = useCustionMutation()

  const navigate = useNavigate();
  
  const emailRegExp = 
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const phoneRegExp =
  /^[0-9]{11}$/

  const schema = yup.object().shape({
    email: yup.string().required('empty').matches(emailRegExp),
    password: yup.string().required('empty').min(8).max(16),
    passwordCheck: yup.string().required('empty').oneOf([yup.ref('password'), null]),
    username: yup.string().required('empty').min(2),
    phone: yup.string().required('empty').matches(phoneRegExp),
  })

  const { register, handleSubmit, watch, formState: { errors, isValid, isSubmitted } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const emailValue = watch('email');
  const passwordValue = watch('password');
  const passwordCheckValue = watch('passwordCheck');
  const nameValue = watch('name');
  const phoneValue = watch('phone');

  const [errorMessage, setErrorMessage] = useState('');

  const signUpSubmit = async (data) => {             
    try{
      mutate({
        url: import.meta.env.VITE_REGISTER_URL, 
        data,
      })
      navigate('/login')
    }
    catch(error){
      console.log(error)
      setErrorMessage(error.response?.data?.message);
    }
  }

  useEffect(() => {
    if (isLogged)
      window.location.replace('/')
  })
  
  useTitle('왓챠 | 회원가입', !isLogged)

  return (
    <S.ContentContainer>
      {!isLogged && 
      <S.ContentBox>
        <S.SignForm onSubmit={handleSubmit(signUpSubmit)}>
          <S.SignTitle>회원가입</S.SignTitle>
          <S.InputDiv>
            <S.InputText type='text' placeholder='이메일 | example@gmail.com' {...register("email")}
            $border={(emailValue || isSubmitted) && errors.email ? '2px solid #e73e3e' : '2px solid black'}
            />
            {(emailValue || isSubmitted) && 
              <S.ValidationIcon src={errors.email? '/src/icon/x_circle.svg' : '/src/icon/check_circle.svg'}/>
            }
          </S.InputDiv >
          <S.InputDiv>
            <S.InputText type='password' placeholder='비밀번호 | 8~16자' maxLength={16} {...register("password")}
            $border={(passwordValue || isSubmitted) && errors.password ? '2px solid #e73e3e' : '2px solid black'}
            />
            {(passwordValue || isSubmitted) && 
              <S.ValidationIcon src={errors.password? '/src/icon/x_circle.svg' : '/src/icon/check_circle.svg'}/>
            }
          </S.InputDiv>
          <S.InputDiv>
            <S.InputText type='password' placeholder='비밀번호 재입력' maxLength={16} {...register("passwordCheck")}
            $border={(!passwordCheckValue && isSubmitted) || (passwordCheckValue && (passwordCheckValue !== passwordValue)) ? '2px solid #e73e3e' : '2px solid black'}
            />
            {(passwordCheckValue || isSubmitted) && 
              <S.ValidationIcon src={!passwordCheckValue || (passwordCheckValue !== passwordValue)? '/src/icon/x_circle.svg' : '/src/icon/check_circle.svg'}/>
            }
          </S.InputDiv>
          <S.InputDiv style={{margin: '15px 0 0'}}>
            <S.InputText type='text' placeholder='이름' maxLength={30} {...register("username")}
            $border={(nameValue || isSubmitted) && errors.username ? '2px solid #e73e3e' : '2px solid black'}
            />
            {(nameValue || isSubmitted) && 
              <S.ValidationIcon src={errors.username? '/src/icon/x_circle.svg' : '/src/icon/check_circle.svg'}/>
            }
          </S.InputDiv>
          <S.InputDiv>
            <S.InputText type='text' placeholder='휴대전화번호' maxLength={11} {...register("phone")}
            $border={(phoneValue || isSubmitted) && errors.phone ? '2px solid #e73e3e' : '2px solid black'}/>
            {(phoneValue || isSubmitted) && 
              <S.ValidationIcon src={errors.phone? '/src/icon/x_circle.svg' : '/src/icon/check_circle.svg'}/>
            }
          </S.InputDiv>

          {errorMessage !== '' && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}

          <S.SubmitButton $opacity={!isValid ? '0.3' : '1'}>회원가입</S.SubmitButton>
        </S.SignForm>
      </S.ContentBox>
      }
    </S.ContentContainer>
  );
}

export default SignUpPage;
