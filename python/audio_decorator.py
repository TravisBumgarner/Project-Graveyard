def mario_or_bust(fcn):
    def wrappers(*args, **kwargs):
        try:
            return fcn(*args, **kwargs)
            os.system('afplay /Users/travis-bumgarner/Programming/smb_stage_clear.wav -v 0.05')

        except Error as e:
            print(e)
            os.system('afplay /Users/travis-bumgarner/Programming/smb_gameover.wav -v 0.05')
    return wrappers

# @mario_or_bust
# def foo():
#     notrealfunction()
# foo()
