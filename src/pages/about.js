import React from 'react'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import profilePic from '../assets/profile-pic.jpg'
import Layout from '../components/Layout'
import typography from '../utils/typography'
import { graphql } from "gatsby"



const rhythm = typography.rhythm;

class BlogAbout extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(this, 'props.data.site.siteMetadata.description')

    return (
      <Layout location={this.props.location}>

      <div style={{marginLeft:rhythm(1), marginRight:rhythm(1)}}>
         <Helmet>
        <title>{`${siteTitle} Developer and Speaker`}</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta property="og:title" content={`${siteTitle} Developer and Speaker`}/>
        <meta property="og:description" content={siteDescription}/>
        <meta property="og:image" content="https://www.johndpotts.com/profile-pic.png"/>
        <meta property="og:url" content={`https://www.johndpotts.com/about`}/>
        <meta name="twitter:card" content="summary"/>
        <meta property="og:type" content="article"/>
        <meta property="og:locale" content="en_US"/>
        <link rel="shortcut icon" href="/favicon.png"></link>
         <link rel="canonical" href={`https://www.johndpotts.com/about`}/>
        </Helmet>
        <h1 className="callout-txt" style={{ textAlign: 'center' }}>
          About Me
        </h1>

        <div>
          <img
            src={profilePic}
            alt={`John D Potts`}
            style={{
              display: 'block',
              marginRight: 'auto',
              marginLeft: 'auto',
              marginBottom: rhythm(2),
              width: rhythm(10),
              height: rhythm(10),
            }}
          />
          <h2>Hi, I'm John.</h2>
          <p>
           I'm a full stack software engineer with a focus on front-end technologies.
            I am currently working at Duke Energy in Charlotte, NC in the Digital Transformations group. Prior to this I worked at Ally Financial
            on the storefront team and as a freelance developer.
            My current tech stack is Angular, Spring Boot, and SQL (with a few node scripts from time to time).
           A few other frameworks / stacks I enjoy are React, Adobe Experience Manager, and Python/Flask.
            Outside of my career as a developer I enjoy giving back to the tech community
            through open source and teaching.
          </p>
          <p>
            I am a dad of 4, husband of 1, and a lifelong learner. I'm also a
            musician and love the outdoors, and my favorite comic strip is
            Calvin & Hobbes!
          </p>
          <p>
            Please feel free to hit me up on Github or Linkedin, or drop me an
            email at{' '}
            <a
              href="mailto:jdpotts189@gmail.com?Subject=Hi%20John"
              target="_top"
            >
              jdpotts189@gmail.com
            </a>. Thanks for stopping by!
          </p>
        </div>
      </div>
      </Layout>
    )
  }
}

export default BlogAbout


export const aboutQuery = graphql`
  query aboutQuery {
    site {
      siteMetadata {
        title,
        description
      }
    }
  }
`
