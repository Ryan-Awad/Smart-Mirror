import os

# SAMPLE ADD COMMAND:       Monday Importance 3 Hello World
# SAMPLE CLEAR COMMAND:     Clear Monday      ||      Clear All

def algorithm(x):
    try:
        x = x.lower().split(' ')
        cmdline_tool_path = 'cal.js' 
        cal_path = 'GUI/data/calendar.json'

        if x[0] != 'clear':
            error = [True,True,True]

            day = x[0]
            importance = x[2]
            event = ' '.join(x[3:]).capitalize() # if no event is given, event = ''

            if event != '':
                error[0] = False

            # annoying patch to google detecting "to" instead of "two" or "2"
            if importance == 'to': 
                importance = '2'

            word_nums = ['zero', 'one', 'two', 'three']
            nums = [str(n) for n in range(0,4)] 
            if importance not in nums: 
                for (w_num, num) in zip(word_nums, nums):
                    if importance == w_num:
                        importance = num
                        error[1] = False
                        break
            else:
                error[1] = False
                
            full_days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
            cal_days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
            for (f_days, c_day) in zip(full_days, cal_days):
                if day == f_days:
                    day = c_day
                    error[2] = False
                    break
            if True not in error:
                if importance == '0':
                    os.system(f'node {cmdline_tool_path} -p {cal_path} -d {day} -n "{event}"')
                else:
                    os.system(f'node {cmdline_tool_path} -p {cal_path} -d {day} -i {importance} -n "{event}"')
                return 'Successfully added event to calendar.'
            else:
                print(f'[ERROR : Invalid parameters when editing calendar | Errors: {error}]')
                return 'Sorry? I did not understand!'
        else:
            error = True
            clear = x[1]
            args = ['all', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
            cal_args = ['all', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
            for (arg, c_arg) in zip(args, cal_args):
                if clear == arg:
                    clear = c_arg
                    error = False
                    break
            if not error:
                os.system(f'node {cmdline_tool_path} -p {cal_path} -c {clear}')
                return 'Successfully cleared event for selected day(s).'
            else:
                print('[ERROR : Invalid parameters when clearing calendar | Error: {error}]')
                return 'Sorry? I did not understand!'
    except:
        print('[ERROR : Invalid parameters when working with calendar]')
        return 'Sorry? I did not understand!'