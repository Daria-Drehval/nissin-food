import { load } from '@shopify/theme-sections';

window.lozadObserver = window.lozad();
lozadObserver.observe();

load('*');

import './custom-select';
