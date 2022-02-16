import { useEffect, useState } from "react";
//https://codesandbox.io/s/81zkxw8qnl?file=/src/index.tsx
const useRecorder = () => {
    const [audioURL, setAudioURL] = useState<string>("");
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [recorder, setRecorder] = useState(null);
    console.log(audioURL)
    useEffect(() => {
        if (recorder === null) {
            if (isRecording) {
                requestRecorder().then(setRecorder, console.error);
            }
            return;
        }

        if (isRecording) {
            recorder.start();
        } else {
            recorder.stop();
        }

        const handleData = (e: any) => {
            setAudioURL(URL.createObjectURL(e.data));
        };

        recorder.addEventListener("dataavailable", handleData);
        return () => recorder.removeEventListener("dataavailable", handleData);
    }, [recorder, isRecording]);

    const startRecording = () => {
        setIsRecording(true);
    };

    const stopRecording = () => {
        setIsRecording(false);
    };

    return [audioURL, isRecording, startRecording, stopRecording];
};

async function requestRecorder() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return new MediaRecorder(stream);
}
export default useRecorder;
