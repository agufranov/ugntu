angular.module('starter.controllers', [])

.controller('TestCtrl', function($scope, $ionicModal, $timeout) {
  $ionicModal.fromTemplateUrl('confirm-finish-test-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  })
    .then(function(modal) {
      $scope.confirmFinishTestModal = modal;
    });

  $ionicModal.fromTemplateUrl('test-results-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  })
    .then(function(modal) {
      $scope.testResultsModal = modal;
    });

  $scope.reset = function() {
    $scope.answers = _.map([2, 1, 3, 4, 1, 2, 3, 3, 3, 1],
      function(x, i) { return { index: i, expected: x - 1 } });
    $scope.checked = false;

    // // TODO debug
    // $timeout(function() {
    //   _.each($scope.answers, function(a) {
    //     a.actual = Math.floor(Math.random() * 5);
    //   });
    // }, 100);
  }

  $scope.questions = [
    {
      q: 'Какое из перечисленных устройств ввода относится к классу манипуляторов?',
      a: [
        'Тачпад',
        'Джойстик',
        'Микрофон',
        'Клавиатура'
      ]
    }, {
      q: 'Датчик-это:',
      a: [
        'аппаратные компоненты, предназначенные для получения данных о расположении компьютера, условиях окружающей среды и других сведений',
        'устройство ввода информации',
        'электронные устройства, обладающие способностью длительно находиться в одном из двух устойчивых состояний и чередовать их под воздействием внешних сигналов',
        'защёлки, спусковые крючки'
      ]
    }, {
      q: 'Что такое электрический ток:',
      a: [
        'графическое изображение элементов',
        'это устройство для измерения ЭДС',
        'упорядоченное движение заряженных частиц в проводнике',
        'беспорядочное движение частиц вещества'
      ]
    }, {
      q: 'Какой углерод в организме человека играет главную роль в энергетическом обмене:',
      a: [
        'фруктоза',
        'сахароза',
        'крахмал',
        'глюкоза'
      ]
    }, {
      q: 'Рабочие машины это:',
      a: [
        'машины использующие механическую энергию для совершения работы по перемещению и преобразованию материалов',
        'преобразующие энергию одного вида в энергию другого вида',
        'машины, предназначенные для обработки и преобразования информации',
        'машины управляющие рабочими или энергетическими машинами'
      ]
    }, {
      q: 'Перед отключением компьютера информацию можно сохранить:',
      a: [
        'в оперативной памяти',
        'во внешней памяти',
        'в контроллере магнитного диска'
      ]
    }, {
      q: 'целью автоматизации производства является:',
      a: [
        'улучшение автоматизированных устройств',
        'повышения уровня квалификации рабочих',
        'повышение качества эффективности труда'
      ]
    }, {
      q: 'Какие приборы способны измерить напряжение в электрической цепи:',
      a: [
        'амперметр',
        'ваттметр',
        'вольтметр',
        'омметры'
      ]
    }, {
      q: 'Какой из приведённых веществ может проявлять как окислительные, так и восстановительные свойства:',
      a: [
        'аммиак',
        'азотная кислота',
        'нитрат аммония',
        'нитрат калия'
      ]
    }, {
      q: 'Механика-это:',
      a: [
        'раздел физики о механическом движении материальных тел и происходящих при этом взаимодействиях между ним',
        'раздел физики, изучающий электромагнитное поле в наиболее общем случае',
        'раздел физики изучающий структуру и свойства атомных ядер, а так же их столкновения',
        'прикладная наука о законах движения, равновесия жидкостей'
      ]
    }
  ];

  $scope.apts = {
    bab: 'Вам легко дается информатика и Вам подходит специальность БАБ',
    batp: 'Вы любите нажимать на кнопки и Вам подходит специальность БАТП',
    bae: 'Вы дружите с током и Вам подходит специальность БАЭ',
    btp: 'Вы любите химичить и Вам подходит специальность БТП',
    bma: 'Вас привлекает работа с оборудованием и Вам подходит специальность БМА'
  };

  $scope.aptQs = {
    0: 'bab',
    5: 'bab',
    1: 'batp',
    6: 'batp',
    2: 'bae',
    7: 'bae',
    3: 'btp',
    8: 'btp',
    4: 'bma',
    9: 'bma'
  };

  $scope.check = function() {
    $scope.confirmFinishTestModal.hide();
    $scope.checked = true;
    _.each($scope.answers, function(answer) {
      answer.correct = !!(answer.expected.toString() === (answer.actual !== undefined && answer.actual.toString()));
    });
    $scope.maxApts = _.countBy($scope.aptQs);
    $scope.scores = _($scope.answers)
      .filter('correct')
      .map('index')
      .map(function(i) { return $scope.aptQs[i] })
      .countBy()
      .map(function(answered, apt) {
        if(answered == $scope.maxApts[apt]) return [apt, 2];
        else if(answered == 0) return [apt, 0];
        else return [apt, 1];
      })
      .fromPairs()
      .value();
    $scope.noAnswers = _.isEmpty($scope.scores);
    $scope.counts = {
      correct: _.filter($scope.answers, 'correct').length,
      all: _.keys($scope.answers).length
    };
    $scope.testResultsModal.show();
  }

  $scope.preCheck = function() {
    if(_.some($scope.answers, function(answer) {
      return answer.actual === undefined;
    })) {
      $scope.confirmFinishTestModal.show();
    }
    else {
      $scope.check();
    }
  };

  $scope.reset();
});
