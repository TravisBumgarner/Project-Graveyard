def audio_on_done(fcn):
    def wrapper():
        try:
            fcn()
            os.system('afplay path_to_success_sound.wav')
        except:
            os.system('afplay path_to_fail_sound.wav')

    return wrapper


# Example
# @audio_on_done
# def foo():
#     x()
# foo()