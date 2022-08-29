const express = require('express')
const router = express.Router();
const { setTokenCookie, restoreUser } = require('../../db/utils/auth');
const { User } = require('../../db/models');

router.post(
    '/',
    async (req, res) => {
      const { email, password, username } = req.body;
      const user = await User.signup({ email, username, password });

      await setTokenCookie(res, user);

      return res.json({
        user
      });
    }
  );
module.exports = router;