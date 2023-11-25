import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Spinner from "@/components/shared/Spinner";
import { useUserStore } from "@/stores/useUserData";
import moment from "moment";

interface WindowProps {
  window: number | null;
  setWindow: (window: number | null) => void;
}

interface AgeProps {
  currentWindow: number | null;
  setCurrentWindow: (window: number | null) => void;
}

const FormWindow = ({ window, setWindow }: WindowProps) => {
  const { setExpectedAge, setBirth } = useUserStore();
  const [values, setValues] = useState({
    age: null,
    expectedAge: 80,
  });

  const onChange = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async () => {
    if (!checkFormValidity()) return;

    localStorage.setItem("age", values.age!);
    localStorage.setItem("expected_age", values.expectedAge.toString());

    setExpectedAge(values.expectedAge);
    setBirth(values.age!);

    setWindow(1);
  };

  const checkFormValidity = () => {
    if (!values.age) return false;
    const age = moment().diff(values.age, "years");
    if (age < 0 || age > 100) return false;
    if (values.expectedAge < 20 || values.expectedAge > 100) return false;
    if (values.expectedAge < age) return false;

    return true;
  };
  return (
    <Window>
      <Title>TILL DIE</Title>
      <SmallText
        style={{ margin: "16px 0", fontSize: "13px", textAlign: "center" }}
      >
        Write down your age or birthday to start.
        <br /> You only have to do it once.
      </SmallText>

      <InputText
        name="age"
        type={"date"}
        placeholder="Age"
        value={values.age as any}
        onChange={onChange}
      />

      <SmallText style={{ fontSize: "10px", marginBottom: "20px" }}>
        {values.age
          ? moment().diff(values.age, "years") > 0 &&
            moment().diff(values.age, "years") < 100
            ? "You are " +
              moment().diff(values.age, "years") +
              " year(s) old." +
              (moment().diff(values.age, "years") < 5
                ? " Are you sure though?"
                : "")
            : "Sorry, You can't do that."
          : "Don&apos;t worry, we won&apos;t save your data."}
      </SmallText>

      <InputText
        name="expectedAge"
        value={values.expectedAge}
        placeholder="Expected Age"
        type="number"
        step={10}
        onChange={onChange}
        min="20"
        max="100"
      />
      <SmallText style={{ fontSize: "10px" }}>
        {values.expectedAge <= moment().diff(values.age, "years") ? (
          <span>
            Can&apos;t go lower than your current age. (
            {moment().diff(values.age, "years")})
          </span>
        ) : values.expectedAge <= 20 ? (
          <span>Uh, oh. No, You gotta live longer. :)</span>
        ) : values.expectedAge <= 40 ? (
          <span>Are you okay?</span>
        ) : values.expectedAge >= 90 ? (
          <span>We really hope that you would make it this far!</span>
        ) : (
          <span>
            The default is <b>80</b>, you can set to multiply of 10.
          </span>
        )}
      </SmallText>

      <Button
        style={{
          cursor: checkFormValidity() ? "pointer" : "not-allowed",
        }}
        disabled={!checkFormValidity()}
        onClick={handleSubmit}
      >
        SUBMIT
      </Button>
    </Window>
  );
};

const LoadingWindow = ({ window, setWindow }: WindowProps) => {
  const quoteList = [
    "Calculating the orbits around the sun...",
    "Counting the rings on your soul...",
    "Measuring your experience...",
    "Decoding your life's journey...",
    "Determining your wisdom level...",
    "Estimating your years of existence...",
    "Calculating your time on Earth...",
  ];

  const [quote, setQuote] = useState("Asking the grim reapers...");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    let timer = setInterval(() => {
      if (amount > 1) setQuote("Calendar generated!");
      else setQuote(quoteList[Math.floor(Math.random() * quoteList.length)]);
      setAmount((prevAmount) => prevAmount + 1);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [amount]);

  useEffect(() => {
    if (amount > 3) {
      setWindow(null);
      localStorage.setItem("is_valid", "1");
      document.body.style.overflow = "unset";
    }
  }, [amount]);

  return (
    <Window>
      <Center style={{ flexDirection: "column" }}>
        {amount < 3 && (
          <Spinner
            trackColor="#f3f3f3"
            spinnerColor="#D2B48C"
            size={150}
            borderWidth={5}
          />
        )}

        <SmallText style={{ marginTop: "30px", fontSize: "14px" }}>
          {quote}
        </SmallText>
      </Center>
    </Window>
  );
};

function AgePop({ currentWindow, setCurrentWindow }: AgeProps) {
  // const [currentWindow, setCurrentWindow] = useState<number | null>(0);

  useEffect(() => {
    if (currentWindow !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, []);

  return (
    <Wrapper className={currentWindow === null ? "hide" : "show"}>
      <Overlay />
      <Inner>
        {currentWindow === 0 && (
          <FormWindow window={currentWindow} setWindow={setCurrentWindow} />
        )}

        {(currentWindow === 1 || currentWindow === null) && (
          <LoadingWindow window={currentWindow} setWindow={setCurrentWindow} />
        )}
      </Inner>
    </Wrapper>
  );
}

const Center = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  margin: 0 auto;
  font-family: inherit;
  margin-top: 20px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 8px 0;
  background: #f3f0d7;
  border: none;
`;

const SmallText = styled.p`
  font-size: 12px;
  /* text-align: center; */
`;

const InputText = styled.input`
  padding: 10px;
  width: 100%;
  margin-bottom: 6px;
  margin-top: 10px;
`;

const Title = styled.p`
  font-size: 32px;
  text-align: center;
  letter-spacing: 5px;
`;

const Inner = styled.div`
  background: white;
  padding: 20px;
  width: 300px;
  height: 350px;
  z-index: 1;
`;

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  position: absolute;
  width: 100%;
  height: 100%;
  /* filter: blur(20px); */
  /* filter: alpha(opacity = 50); */
`;

const Window = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  transition: 0.5s ease-in all;
  position: fixed;
  display: flex;
  top: 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999;
`;

export default AgePop;
