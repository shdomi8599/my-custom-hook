// useState와 useCallback을 react에서 import합니다.
import { useState, useCallback } from "react";

// useInputs라는 custom hook을 생성합니다. initialForm이라는 parameter를 받습니다.
const useInputs = (initialForm) => {
  // useState를 사용하여 form이라는 state와 setForm이라는 state를 생성합니다. initialForm을 초기값으로 설정합니다.
  const [form, setForm] = useState(initialForm);

  // useCallback을 사용하여 onChange 함수를 생성합니다.
  const onChange = useCallback((e) => {
    // e.target에서 name과 value를 추출합니다.
    const { name, value } = e.target;
    // setForm을 사용하여 form state를 업데이트합니다. 이때, 기존의 form state를 spread operator로 복사하고, name과 value를 업데이트합니다.
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  // useCallback을 사용하여 reset 함수를 생성합니다. 이때, setForm을 사용하여 form state를 initialForm으로 초기화합니다.
  const reset = useCallback(() => setForm(initialForm), [initialForm]);
  // form, onChange, reset을 반환합니다.
  return [form, onChange, reset];
};

export default useInputs;