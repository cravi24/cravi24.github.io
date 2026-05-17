import Modern from './Modern';
import Traditional from './Traditional';
import BerlinModern from './BerlinModern';
import BerlinStartup from './BerlinStartup';

const Templates = Object.freeze({
  modern: { name: 'Modern', component: Modern },
  traditional: { name: 'Traditional', component: Traditional },
  berlinModern: { name: 'Berlin · Modern', component: BerlinModern },
  berlinStartup: { name: 'Berlin · Startup', component: BerlinStartup },
});

export default Templates;
