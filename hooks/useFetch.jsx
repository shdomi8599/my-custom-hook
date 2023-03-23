const useFetch = (initialUrl) => {
  // useFetch 함수를 정의하고, initialUrl을 매개변수로 받는다.
  const [value, setValue] = useState(""); // useState 훅을 사용하여 value와 setValue를 선언하고, value의 초기값을 ""으로 설정한다.
  useEffect(() => {
    // useEffect 훅을 사용하여 부수 효과를 처리한다.
    axios.get(initialUrl).then(({ data }) => setValue(data)); // axios를 사용하여 initialUrl로 GET 요청을 보내고, 응답 데이터의 body를 value에 저장한다.
  }, [initialUrl]); // initialUrl이 변경될 때마다 useEffect를 실행한다.
  return [value]; // value를 반환한다.
};
export default useFetch;
