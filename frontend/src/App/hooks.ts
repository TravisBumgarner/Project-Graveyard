import { useEffect, useState } from 'react'
import utilities from './utilities'
// https://codesandbox.io/s/81zkxw8qnl?file=/src/index.tsx

async function requestRecorder() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    return new MediaRecorder(stream)
}

const useRecorder = () => {
    const [audioURL, setAudioURL] = useState<string>('')
    const [isRecording, setIsRecording] = useState<boolean>(false)
    const [recorder, setRecorder] = useState(null)
    useEffect(() => {
        if (recorder === null) {
            if (isRecording) {
                requestRecorder().then(setRecorder, utilities.logger)
            }
            return
        }

        if (isRecording) {
            recorder.start()
        } else {
            recorder.stop()
        }

        const handleData = (e: any) => {
            setAudioURL(URL.createObjectURL(e.data))
        }

        recorder.addEventListener('dataavailable', handleData)
        return () => recorder.removeEventListener('dataavailable', handleData)
    }, [recorder, isRecording])

    const startRecording = () => {
        setIsRecording(true)
    }

    const stopRecording = () => {
        setIsRecording(false)
    }

    const clearAudioUrl = () => {
        setAudioURL('')
    }

    return [audioURL, setAudioURL, isRecording, startRecording, stopRecording, clearAudioUrl] as const
}

export { useRecorder }
