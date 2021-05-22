
app.controller('timerCtrl',  function($scope, $timeout, $log, entryFactory, projectsFactory){
    $scope.entries =  entryFactory.getEntries();
    $scope.model = {
        modalType: 'select'
    };
    var tmPromise;
    var timeStart = 0, timeEnd = 0;
    var state = 0;//Not started yet
    $scope.counter = 0;
    $scope.open = false;
    $scope.running = false;
    $scope.paused = false;
    $scope.pauseStatus = "Pause";
    $scope.mode = "Start Working";
    $scope.timer =  moment().hour(0).minute(0).second(0).format('HH : mm : ss');
    $scope.mytimeFrom = new Date();
    $scope.mytimeTo = new Date();
    $scope.hstep = 1;
    $scope.mstep = 1;
    $scope.projects = projectsFactory.getProjects();

    $scope.ismeridian = true;

    $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
    };


    $scope.changed = function () {
        console.log(moment($scope.mytimeTo));
        console.log(moment($scope.mytimeFrom));
        console.log(moment($scope.dt).toDate());
        console.log(moment.duration(moment($scope.mytimeTo).diff(moment($scope.mytimeFrom))));
        console.log(moment($scope.mytimeTo).isBefore(moment($scope.mytimeFrom)));
    };
    $scope.logEntry = function(){
        $scope.cancel();
        console.log(moment($scope.mytimeTo));
        console.log(moment($scope.mytimeFrom));
        console.log(moment($scope.dt).toDate());
        console.log(moment.utc(moment(moment($scope.mytimeTo).diff(moment($scope.mytimeFrom)))));
        console.log(moment($scope.mytimeTo).isBefore(moment($scope.mytimeFrom)));
        entryFactory.getEntries().push({date: moment($scope.dt), description: $scope.manualdescription, start: moment($scope.mytimeFrom), end: moment($scope.mytimeTo), duration: moment.utc(moment(moment($scope.mytimeTo).diff(moment($scope.mytimeFrom)))), project: $scope.manualproject});
    }
    $scope.checkValidTime = function(){
        if(moment($scope.mytimeTo).isSameOrBefore(moment($scope.mytimeFrom)) || !$scope.manualdescription || !$scope.manualproject){
            return true;
        }
        return false;
    };
    $scope.today = function() {
        $scope.dt = moment().toDate();


    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };
    $scope.changeDate = function(){
        console.log(moment($scope.dt).toDate());
    };
    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }
    function startTimer() {
        // toggle
        startTime = moment();
        $scope.mode = "Log Session";
        state = 1;
        $scope.running = true;
        $scope.counter++;
        $scope.timer = moment().hour(0).minute(0).second($scope.counter).format('HH : mm : ss');
        // timer expired, restart timer
        setTimer();
    }
    setTimer = function(){
        tmPromise = $timeout(function () {
            startTimer();
        }, 1000);
    }
    $scope.descRequired = function(){
        if((state == 1 || state ==2) && (!$scope.timerdescription || !$scope.timerproject)){
            return true;
        }
        return false;
    }
    function stopTimer(){
        $timeout.cancel(tmPromise);
        timeEnd = moment(moment(), $scope.timer);
        console.log(timeStart);
        console.log(timeEnd);
        console.log(moment.utc(moment(timeEnd.diff(timeStart))).format('HH:mm:ss'));
        entryFactory.getEntries().push({date: moment(), description: $scope.timerdescription, start: timeStart, end: timeEnd, duration: moment.utc(moment(timeEnd.diff(timeStart))), project: $scope.timerproject});
        $scope.cancel();
        resetTimer();

    }
    function resetTimer(){
        state = 0;
        $scope.timer =  moment().hour(0).minute(0).second(0).format('HH : mm : ss');
        $scope.running = false;
        $scope.mode = "Start Working";
        $scope.counter = 0;
    }
    $scope.pauseTimer = function(){
        if(state == 1) {
            $timeout.cancel(tmPromise);
            $scope.paused = true;
            $scope.pauseStatus = "Continue";
            state = 2;
        }else if(state == 2){
            setTimer();
            $scope.paused = false;
            $scope.pauseStatus = "Pause";
        }
    }
    $scope.toggleTimer = function () {

        // handle modes
        if (state === 0) {
            timeStart = moment();
            console.log(timeStart);
            startTimer();
        } else {
            stopTimer();
        }

    };
    
});