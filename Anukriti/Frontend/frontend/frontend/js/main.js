
/* Anukriti 2026 – page behaviour (no dependencies) */

(function () {
  'use strict';

  /* ---- Gallery filter ---- */

  var tabs = document.querySelectorAll('.tab');
  var tiles = document.querySelectorAll('#grid .tile');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var f = tab.dataset.filter;

      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-pressed', on ? 'true' : 'false');
      });

      tiles.forEach(function (tile) {
        tile.hidden = !(f === 'all' || tile.dataset.type === f);
      });
    });
  });

  /* ---- FAQ accordion (one open at a time) ---- */

  var qs = document.querySelectorAll('.faq__q');

  qs.forEach(function (q) {
    q.addEventListener('click', function () {
      var willOpen = q.getAttribute('aria-expanded') !== 'true';

      qs.forEach(function (other) {
        other.setAttribute('aria-expanded', 'false');
        other.querySelector('i').textContent = '+';

        var panel = document.getElementById(
          other.getAttribute('aria-controls')
        );

        if (panel) {
          panel.hidden = true;
        }
      });

      if (willOpen) {
        q.setAttribute('aria-expanded', 'true');
        q.querySelector('i').textContent = '−';

        var panel = document.getElementById(
          q.getAttribute('aria-controls')
        );

        if (panel) {
          panel.hidden = false;
        }
      }
    });
  });

  /* ---- Registration form + FastAPI ---- */

  var form = document.getElementById('reg-form');
  var err = document.getElementById('reg-error');
  var done = document.getElementById('reg-done');
  var first = document.getElementById('reg-first');

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      var data = {};
      var ok = true;

      /* Validate the existing form fields */

      ['name', 'roll', 'email', 'mobile'].forEach(function (k) {
        var input = form.elements[k];

        if (!input) {
          console.error('Registration input not found:', k);
          ok = false;
          return;
        }

        data[k] = input.value.trim();

        var valid =
          data[k] !== '' &&
          (k !== 'email' || /^\S+@\S+\.\S+$/.test(data[k]));

        input.classList.toggle('is-bad', !valid);

        if (!valid) {
          ok = false;
        }
      });

      if (err) {
        err.hidden = ok;
      }

      if (!ok) {
        return;
      }

      /* Prevent repeated submissions while the request is running */

      var submitButton = form.querySelector(
        'button[type="submit"], input[type="submit"]'
      );

      if (submitButton) {
        submitButton.disabled = true;
      }

      try {
        /* Send the registration data to FastAPI */

        var response = await fetch(
          'http://127.0.0.1:8000/register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }
        );

        var result = await response.json();

if (!response.ok) {
  console.error('FastAPI validation error:', result);

  var message = Array.isArray(result.detail)
    ? result.detail.map(function (item) {
        return item.loc.join('.') + ': ' + item.msg;
      }).join('\n')
    : typeof result.detail === 'string'
      ? result.detail
      : JSON.stringify(result.detail);

  throw new Error(message || 'Registration failed.');
}

        /* Show success only after FastAPI confirms success */

        if (first) {
          first.textContent = data.name.split(' ')[0];
        }

        form.hidden = true;

        if (done) {
          done.hidden = false;
        }

        if (err) {
          err.hidden = true;
        }

      } catch (error) {
        console.error('Registration error:', error);

        alert(
          error.message ||
          'Could not connect to the server. Please try again.'
        );

      } finally {
        if (submitButton) {
          submitButton.disabled = false;
        }
      }
    });
  }

})();

