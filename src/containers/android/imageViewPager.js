/**
 * Created by 123 on 2016/8/10.
 */
import ViewPager from 'react-native-viewpager'
import React, { Component } from 'react';

class imageViewPager extends React.Component{
    constructor(props) {
        super(props);

    }
    render(){
        return(
            <ViewPager

                dataSource={this.state.dataSource}

                renderPage={this._renderPage}/>
            )

    }
}

export default imageViewPager