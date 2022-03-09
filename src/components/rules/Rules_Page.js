const Rules_Page = () => {
  return (
    <main id="rules_page">
      <div>
        <h4>
          Setting this up with an API (automatic score updates) would have cost
          money, and I didn't want to take that out of the purse. So, at least
          for this year, I'll still be updating scores manually, but I'll be
          doing it more regularly throughout the tourney.
          <div>&nbsp;</div>
          Last Updated info will be in the top left of the site upon signing in.
          <div>&nbsp;</div>
          -------
        </h4>
        <h3>Pool Scoring</h3>
        <ul>
          <li>Choose two golfers at or under 25/1 odds</li>
          <li>Choose two golfers between 26/1 & 75/1 odds</li>
          <li>Choose two golfers over 76/1 odds</li>
          <li>
            The person with the lowest cumulative score between their six
            golfers wins.
          </li>
        </ul>

        <h3>Missed cut penalty:</h3>
        <ul>
          <li>If a player misses the cut, add +5 to their score.</li>
          <li>
            All golfers that make the cut would be capped out at the cut line
            for Saturday and Sunday.
          </li>
        </ul>
        <h4>Example scenario:</h4>
        <ul>
          <li>Cut is +4.</li>
          <li>Sergio ends on Friday at +6 - his final score will be +11.</li>
          <li>
            Koepka makes the cut at -3, but pulls a Spieth on Sunday and ends at
            +5 - Koepka's final score would be +4.
          </li>
        </ul>
        <h3>Player DQ penalty:</h3>
        <ul>
          <li>If a player is disqualified, add +10 to their score.</li>
        </ul>
        <h3>Tiebreaker:</h3>
        <ul>
          <li>Choose a winner, and their final score in accordance to 288.</li>
          <li>
            In the event of a final score tie between your six golfers:
            <ul>
              <li>
                The 1st tie breaker would be if you selected the correct winner.
                If both, or neither person selected the correct winner:
              </li>
              <li>
                The 2nd tiebreaker would be the closest (in strokes) to the
                Masters winner's final score, price is right rules. If both
                tiebreaker scores are over the Masters winner's final score, the
                winner will be the person who is closer to the Masters winner's
                score (ie whoever has the tiebreaker score closest to 0).
              </li>
            </ul>
          </li>
        </ul>
        <h3>Submitting Your Golfer Picks & Tiebreaker Info:</h3>
        <ul>
          <li>
            If this is your first year doing our pool, shoot me an email
            (jpatcollins@gmail.com) noting who referred you.
          </li>
          <li>
            Create an Account, then sign in; the link to create an account is
            located on the Sign In page.
          </li>
          <li>Once signed in in, navigate to the My Picks tab.</li>
        </ul>
        <h3>Payments/Payout:</h3>
        <ul>
          <li>$20 entry fee.</li>
          <li>Venmo: Joe-Collins-12</li>
          <li>3rd place gets money back.</li>
          <li>Winner gets 75% of remaining purse.</li>
          <li>2nd place gets 25% of remaining purse.</li>
        </ul>
      </div>
    </main>
  );
};

export default Rules_Page;
