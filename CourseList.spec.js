/* eslint-env jasmine */
'use strict';

import React from 'react';
import { shallow } from 'enzyme';

import { CourseList } from './CourseList.js';

describe('CourseList component', () => {
  xit('should handle an empty list', () => {
    const wrapper = shallow(<CourseList courses={[]} />);

    expect(wrapper.find('li').length).toEqual(0);
  });

  xit('should have a li for each course', () => {
    const wrapper = shallow(<CourseList testID="course-list" courses={[
      { ID: '1', name: 'one' },
      { ID: '2', name: 'two' },
      { ID: '3', name: 'three' },
      { ID: '4', name: 'four' },
      { ID: '5', name: 'five' }
    ]} />);

    expect(wrapper.find('li').length).toBe(5);
  });

  xit('should sort them in by their names', () => {
    const wrapper = shallow(<CourseList testID="course-list" courses={[
      { ID: '1', name: 'one' },
      { ID: '2', name: 'Two' },
      { ID: '3', name: 'three' },
      { ID: '4', name: 'z four' },
      { ID: '5', name: 'five' }
    ]} />);

    expect(
      wrapper.find('li span[data-test-id="course-list-course-name"]').map(span => span.text())
    ).toEqual(
      [ 'five', 'one', 'three', 'Two', 'z four' ]
    );
  });

  xit('should keep the IDs with the names', () => {
    const wrapper = shallow(<CourseList testID="course-list" courses={[
      { ID: '1', name: 'one' },
      { ID: '2', name: 'Two' },
      { ID: '3', name: 'three' },
      { ID: '4', name: 'z four' },
      { ID: '5', name: 'five' }
    ]} />);

    expect(
      wrapper.find('li').map(li => li.key())
    ).toEqual(
      [ '5', '1', '3', '2', '4' ]
    );
  });

  xit('should handle deletes', () => {
    const FIVE = { ID: '5', name: 'five' };
    const spy = jasmine.createSpy('delete');
    const wrapper = shallow(<CourseList
      testID="course-list"
      onDelete={spy}
      courses={[
        { ID: '1', name: 'one' },
        { ID: '2', name: 'Two' },
        { ID: '3', name: 'three' },
        { ID: '4', name: 'z four' },
        FIVE
      ]} />);

    wrapper
      .find('li')
      .filterWhere(li => li.key() === '5')
      .find('[data-test-id="course-list-course-delete"]')
      .simulate('click');

    expect(spy.calls.count()).toBe(1);
    expect(spy).toHaveBeenCalledWith(FIVE);
  });
});
