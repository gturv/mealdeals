
    const convertDayToNum = day => {
        switch (day) {
            case 'monday':
                return '1';
            case 'tuesday':
                return '2';
            case 'wednesday':
                return '3';
            case 'thursday':
                return '4';
            case 'friday':
                return '5'
            case 'saturday':
                return '6';
            case 'sunday':
                return '0'
            default:
                return day;
        }
    }

    const convertNumToDay = num => {
        switch (num) {
            case '1': 
                return "monday";
            case '2':
                return "tuesday";
            case '3': 
                return "wednesday";
            case '4': 
                return "thursday";
            case '5': 
                return "friday";
            case '6': 
                return "saturday";
            case '0':
                return 'sunday'
            default:
                return num;
        }
    }


