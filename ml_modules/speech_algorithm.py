import os

# SAMPLE ADD COMMAND:       Monday Importance 3 Hello World
# SAMPLE CLEAR COMMAND:     Clear Monday      ||      Clear All

def algorithm(x):
    try:
        x = x.lower().split(' ')
        cmdline_tool_path = 'cal.js' 
        cal_path = 'GUI/data/calendar.json'

        if x[0] != 'clear':
            error = [True,True]

            day = x[0]
            importance = x[2]
            event = ' '.join(x[3:])

            # annoying patch to google detectin "to" instead of "two" or "2"
            if importance == 'to': 
                importance = '2'

            word_nums = ['zero', 'one', 'two', 'three']
            nums = [str(n) for n in range(0,4)] 
            if importance not in nums: 
                for i in range(len(word_nums)):
                    if importance == word_nums[i]:
                        importance = nums[i]
                        error[0] = False
                        break
            else:
                error[0] = False
                
            days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
            cal_days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
            for i in range(len(days)):
                if day == days[i]:
                    day = cal_days[i]
                    error[1] = False
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
            for i in range(len(args)):
                if clear == args[i]:
                    clear = cal_args[i]
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