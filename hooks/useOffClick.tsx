import { useEffect, useRef, useState } from "react";

// 제네릭 타입 T가 HTMLElement를 상속받는 형태이며 initialState로 초기 상태를 받아옴
export const useOffClick = <T extends HTMLElement>(initialState: boolean) => {
  // 초기 상태를 state로 저장하고 setState 함수로 상태를 업데이트 할 수 있음
  const [state, setState] = useState(initialState);

  // ref를 만들어서 T 타입의 요소에 대한 ref를 만듦
  const ref = useRef<T>(null);

  // 컴포넌트가 마운트 되거나 state나 ref가 변경될 때마다 이펙트 함수를 호출함
  useEffect(() => {
    // 클릭 이벤트가 발생하면 실행될 함수
    const offClick = (e: MouseEvent) => {
      const target = e.target;
      // state가 true이고 ref에 존재하며 클릭 이벤트가 발생한 요소가 ref에 속하지 않는 경우
      if (state && ref.current && !ref.current.contains(target as Node)) {
        // 상태를 false로 변경함
        setState(false);
      }
    };
    // document에 클릭 이벤트를 추가함
    document.addEventListener("click", offClick);

    // cleanup 함수. 컴포넌트가 언마운트 되면 실행됨
    return () => {
      // document에서 클릭 이벤트를 제거함
      document.removeEventListener("click", offClick);
    };
  }, [ref, state]);

  // useState와 useRef를 모두 사용하는 경우 배열로 리턴할 때 as const를 추가하여 타입스크립트에서 추론 가능하게 함
  return [state, setState, ref] as const;
};
