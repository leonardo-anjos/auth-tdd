const bcrypt = require('bcryptjs');

const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('Autenticate', () => {
  beforeEach(async () => {
    await truncate();
  })
  
  it('should encrypt user password', async () => {
    const user = await User.create({
      name: 'leo',
      email: 'leodrums11@gmail.com',
      password: '1133'
    }); 

    const compareHash = await bcrypt.compare('1133', user.password_hash);
    
    expect(compareHash).toBe(true);  
  });
});