$(document).ready(function(){
  var cards = [];
  var currentIndex = -1;

  function updateStack() {
    cards.forEach(function(card, index) {
      var left = 100 + index * 22;
      var top = 80 + index * 12;
      var zIndex = index === currentIndex ? 100 + cards.length : 100 + index;
      card.element.css({
        left: left + 'px',
        top: top + 'px',
        'z-index': zIndex
      });
      if (index === currentIndex) {
        card.element.removeClass('inactive').addClass('active');
      } else {
        card.element.removeClass('active').addClass('inactive');
      }
    });
  }

  function selectCard(index) {
    if (cards.length === 0) {
      currentIndex = -1;
      return;
    }
    currentIndex = (index + cards.length) % cards.length;
    updateStack();
  }

  function createCard(data, type) {
    var template = $('#card-template').html();
    var card = $(template);
    var userData = data['user'][0];
    var licenseData = data['licenses'];
    var sex = userData.sex || 'm';

    if (type == 'driver' || type == null) {
      card.find('img').show();
      card.find('.name').css('color', '#282828');

      if (sex.toLowerCase() === 'm') {
        card.find('img').attr('src', 'assets/images/male.png');
        card.find('.sex').text('male');
      } else {
        card.find('img').attr('src', 'assets/images/female.png');
        card.find('.sex').text('female');
      }

      card.find('.name').text(userData.firstname + ' ' + userData.lastname);
      card.find('.dob').text(userData.dateofbirth);
      card.find('.height').text(userData.height);
      card.find('.signature').text(userData.firstname + ' ' + userData.lastname);

      if (type === 'driver') {
        if (licenseData != null) {
          Object.keys(licenseData).forEach(function(key) {
            var licenseType = licenseData[key].type;
            if (licenseType === 'drive_bike') {
              licenseType = 'bike';
            } else if (licenseType === 'drive_truck') {
              licenseType = 'truck';
            } else if (licenseType === 'drive') {
              licenseType = 'car';
            }

            if (licenseType === 'bike' || licenseType === 'truck' || licenseType === 'car') {
              card.find('.licenses').append('<p>' + licenseType + '</p>');
            }
          });
        }
        card.css('background', 'url(assets/images/license.png)');
      } else {
        card.css('background', 'url(assets/images/idcard.png)');
      }
    } else if (type === 'weapon') {
      card.find('img').hide();
      card.find('.name').css('color', '#d9d9d9');
      card.find('.name').text(userData.firstname + ' ' + userData.lastname);
      card.find('.dob').text(userData.dateofbirth);
      card.find('.signature').text(userData.firstname + ' ' + userData.lastname);
      card.css('background', 'url(assets/images/firearm.png)');
    }

    $('#cards').append(card);
    cards.push({ element: card, type: type });
    selectCard(cards.length - 1);
  }

  function clearCards() {
    cards.forEach(function(card) {
      card.element.remove();
    });
    cards = [];
    currentIndex = -1;
  }

  window.addEventListener('message', function(event) {
    if (event.data.action == 'open') {
      createCard(event.data.array, event.data.type);
    } else if (event.data.action == 'close') {
      clearCards();
    } else if (event.data.action == 'selectLeft' || event.data.action == 'selectUp') {
      selectCard(currentIndex - 1);
    } else if (event.data.action == 'selectRight' || event.data.action == 'selectDown') {
      selectCard(currentIndex + 1);
    }
  });

  $(window).on('keydown', function(event) {
    if (cards.length <= 1) {
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      selectCard(currentIndex - 1);
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      selectCard(currentIndex + 1);
    }
  });
});
