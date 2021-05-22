app.controller('projectsCtrl', function($scope, entryFactory,projectsFactory){
    $scope.projects = projectsFactory.getProjects();

    $scope.calculateTotalTime = function(project){
        var entries = entryFactory.getEntries();
        var durations = [];
        entries.forEach(function(entry){
            if(entry.project == project){
                if(entry.duration) {
                    durations.push(entry.duration.format('HH:mm:ss'));
                }
            }
        });
        return moment.utc(durations.slice(1)
            .reduce((prev, cur) => moment.duration(cur).add(prev),
                moment.duration(durations[0])).asMilliseconds()).format('HH:mm:ss');
    }

    console.log($scope.calculateTotalTime("timekeeper-web"))
});