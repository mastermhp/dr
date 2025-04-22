"use client"

import { useState, useRef } from "react"
import {
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Globe,
  Calendar,
  Linkedin,
  Github,
  Twitter,
  Upload,
  Plus,
  Trash2,
  Check,
  X,
  Edit,
  Save,
  FileText,
  Download,
  Bot,
  AlertTriangle,
  Shield,
} from "lucide-react"
// import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import DashboardLayout from "../components/dashboard-layout"

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=200&width=200")
  const [coverImage, setCoverImage] = useState("/placeholder.svg?height=400&width=1200")
  const [editMode, setEditMode] = useState(false)
  const [profileCompletion, setProfileCompletion] = useState(65)
  const fileInputRef = useRef(null)
  const coverInputRef = useRef(null)

  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    title: "Senior Product Manager",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "alexjohnson.com",
    bio: "Product manager with 8+ years of experience in tech. Passionate about creating user-centric products that solve real problems.",
    company: "TechCorp Inc.",
    birthday: "May 15, 1988",
    skills: ["Product Management", "UX/UI Design", "Agile Methodology", "Data Analysis", "Team Leadership"],
    languages: ["English (Native)", "Spanish (Intermediate)", "French (Basic)"],
    education: [
      {
        id: 1,
        degree: "MBA, Business Administration",
        school: "Stanford University",
        year: "2010 - 2012",
      },
      {
        id: 2,
        degree: "BS, Computer Science",
        school: "University of California, Berkeley",
        year: "2006 - 2010",
      },
    ],
    experience: [
      {
        id: 1,
        position: "Senior Product Manager",
        company: "TechCorp Inc.",
        duration: "2018 - Present",
        description: "Leading product development for enterprise SaaS solutions.",
      },
      {
        id: 2,
        position: "Product Manager",
        company: "InnovateTech",
        duration: "2014 - 2018",
        description: "Managed the development of mobile applications with over 1M users.",
      },
      {
        id: 3,
        position: "Associate Product Manager",
        company: "StartupXYZ",
        duration: "2012 - 2014",
        description: "Assisted in product development and market research.",
      },
    ],
    socialLinks: {
      linkedin: "linkedin.com/in/alexjohnson",
      github: "github.com/alexjohnson",
      twitter: "twitter.com/alexjohnson",
    },
  })

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Resume_AlexJohnson.pdf",
      type: "application/pdf",
      size: "2.4 MB",
      uploadDate: "Jan 15, 2023",
    },
    {
      id: 2,
      name: "Portfolio_2023.pdf",
      type: "application/pdf",
      size: "8.7 MB",
      uploadDate: "Mar 22, 2023",
    },
    {
      id: 3,
      name: "ProjectPresentation.pptx",
      type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      size: "5.1 MB",
      uploadDate: "Apr 10, 2023",
    },
  ])

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target.result)
        setProfileCompletion(Math.min(profileCompletion + 5, 100))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCoverImage(e.target.result)
        setProfileCompletion(Math.min(profileCompletion + 5, 100))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddDocument = () => {
    const newDocument = {
      id: Date.now(),
      name: `Document_${Math.floor(Math.random() * 1000)}.pdf`,
      type: "application/pdf",
      size: `${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 9) + 1} MB`,
      uploadDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    }

    setDocuments([...documents, newDocument])
    setProfileCompletion(Math.min(profileCompletion + 10, 100))
  }

  const handleRemoveDocument = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
    setProfileCompletion(Math.max(profileCompletion - 10, 0))
  }

  const handleSaveProfile = () => {
    setEditMode(false)
    setProfileCompletion(Math.min(profileCompletion + 15, 100))
  }

  const handleAddSkill = () => {
    const newSkill = prompt("Enter a new skill:")
    if (newSkill && newSkill.trim() !== "") {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()],
      })
      setProfileCompletion(Math.min(profileCompletion + 5, 100))
    }
  }

  const handleRemoveSkill = (skill) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skill),
    })
    setProfileCompletion(Math.max(profileCompletion - 5, 0))
  }

  const handleAddEducation = () => {
    const newEducation = {
      id: Date.now(),
      degree: "New Degree",
      school: "University Name",
      year: "20XX - 20XX",
    }

    setProfile({
      ...profile,
      education: [...profile.education, newEducation],
    })
    setProfileCompletion(Math.min(profileCompletion + 5, 100))
  }

  const handleAddExperience = () => {
    const newExperience = {
      id: Date.now(),
      position: "New Position",
      company: "Company Name",
      duration: "20XX - Present",
      description: "Description of your role and responsibilities.",
    }

    setProfile({
      ...profile,
      experience: [...profile.experience, newExperience],
    })
    setProfileCompletion(Math.min(profileCompletion + 5, 100))
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-4 md:p-8">
        {/* Cover Image */}
        <div className="relative h-48 md:h-64 rounded-xl overflow-hidden">
          <img src={coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
          <button
            onClick={() => coverInputRef.current.click()}
            className="absolute bottom-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
          >
            <Upload className="h-5 w-5 text-white" />
          </button>
          <input
            type="file"
            ref={coverInputRef}
            onChange={handleCoverImageChange}
            className="hidden"
            accept="image/*"
          />
        </div>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-6 -mt-16 md:-mt-20 px-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-black overflow-hidden">
              <img src={profileImage || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 p-2 bg-pink-500 rounded-full hover:bg-pink-600 transition-colors"
            >
              <Upload className="h-4 w-4 text-white" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleProfileImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          <div className="flex-1 pt-4 md:pt-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                <p className="text-gray-400">{profile.title}</p>
              </div>

              <div className="flex gap-3">
                {editMode ? (
                  <>
                    <button
                      onClick={() => setEditMode(false)}
                      className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center"
                    >
                      <X className="h-4 w-4 mr-2" /> Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" /> Save Profile
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors flex items-center"
                  >
                    <Edit className="h-4 w-4 mr-2" /> Edit Profile
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-1 text-pink-500" />
                  {profile.email}
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1 text-pink-500" />
                  {profile.phone}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-pink-500" />
                  {profile.location}
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-1 text-pink-500" />
                  {profile.website}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Completion */}
        <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
          <CardHeader>
            <CardTitle>Profile Completion</CardTitle>
            <CardDescription>Complete your profile to improve your AI's understanding</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{profileCompletion}% Complete</span>
                <span className="text-xs text-gray-400">
                  {profileCompletion < 70
                    ? "Add more details to improve your profile"
                    : profileCompletion < 100
                      ? "Almost there!"
                      : "Profile complete!"}
                </span>
              </div>
              <Progress value={profileCompletion} className="h-2" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
                <div
                  className={`text-xs px-2 py-1 rounded-full text-center ${
                    profileCompletion >= 25 ? "bg-green-900/30 text-green-400" : "bg-gray-800 text-gray-400"
                  }`}
                >
                  Basic Info {profileCompletion >= 25 && <Check className="inline h-3 w-3 ml-1" />}
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded-full text-center ${
                    profileCompletion >= 50 ? "bg-green-900/30 text-green-400" : "bg-gray-800 text-gray-400"
                  }`}
                >
                  Experience {profileCompletion >= 50 && <Check className="inline h-3 w-3 ml-1" />}
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded-full text-center ${
                    profileCompletion >= 75 ? "bg-green-900/30 text-green-400" : "bg-gray-800 text-gray-400"
                  }`}
                >
                  Skills {profileCompletion >= 75 && <Check className="inline h-3 w-3 ml-1" />}
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded-full text-center ${
                    profileCompletion >= 100 ? "bg-green-900/30 text-green-400" : "bg-gray-800 text-gray-400"
                  }`}
                >
                  Documents {profileCompletion >= 100 && <Check className="inline h-3 w-3 ml-1" />}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Profile Content */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8 bg-black/50 border border-pink-500/20">
            <TabsTrigger value="about" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              About
            </TabsTrigger>
            <TabsTrigger value="experience" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              Experience
            </TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              Documents
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              AI Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                {/* Bio */}
                <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                  <CardHeader>
                    <CardTitle>Bio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {editMode ? (
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        className="w-full h-32 bg-black/50 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-300">{profile.bio}</p>
                    )}
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Skills</CardTitle>
                    {editMode && (
                      <button
                        onClick={handleAddSkill}
                        className="p-1 bg-pink-500 rounded-full hover:bg-pink-600 transition-colors"
                      >
                        <Plus className="h-4 w-4 text-white" />
                      </button>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <div
                          key={index}
                          className="px-3 py-1 bg-black/50 border border-pink-500/20 rounded-full flex items-center"
                        >
                          <span>{skill}</span>
                          {editMode && (
                            <button
                              onClick={() => handleRemoveSkill(skill)}
                              className="ml-2 text-gray-400 hover:text-pink-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Languages */}
                <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                  <CardHeader>
                    <CardTitle>Languages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {profile.languages.map((language, index) => (
                        <div key={index} className="flex items-center">
                          <Globe className="h-4 w-4 text-pink-500 mr-2" />
                          <span>{language}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                {/* Personal Information */}
                <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-400">Full Name</span>
                        {editMode ? (
                          <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            className="bg-black/50 border border-gray-700 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                        ) : (
                          <span>{profile.name}</span>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm text-gray-400">Job Title</span>
                        {editMode ? (
                          <input
                            type="text"
                            value={profile.title}
                            onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                            className="bg-black/50 border border-gray-700 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                        ) : (
                          <span>{profile.title}</span>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm text-gray-400">Company</span>
                        {editMode ? (
                          <input
                            type="text"
                            value={profile.company}
                            onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                            className="bg-black/50 border border-gray-700 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                        ) : (
                          <span>{profile.company}</span>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm text-gray-400">Birthday</span>
                        {editMode ? (
                          <input
                            type="text"
                            value={profile.birthday}
                            onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
                            className="bg-black/50 border border-gray-700 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-pink-500 mr-2" />
                            <span>{profile.birthday}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                  <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Linkedin className="h-5 w-5 text-blue-500 mr-3" />
                        {editMode ? (
                          <input
                            type="text"
                            value={profile.socialLinks.linkedin}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                socialLinks: { ...profile.socialLinks, linkedin: e.target.value },
                              })
                            }
                            className="flex-1 bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                        ) : (
                          <a href="#" className="text-blue-400 hover:underline">
                            {profile.socialLinks.linkedin}
                          </a>
                        )}
                      </div>

                      <div className="flex items-center">
                        <Github className="h-5 w-5 text-gray-300 mr-3" />
                        {editMode ? (
                          <input
                            type="text"
                            value={profile.socialLinks.github}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                socialLinks: { ...profile.socialLinks, github: e.target.value },
                              })
                            }
                            className="flex-1 bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                        ) : (
                          <a href="#" className="text-gray-400 hover:underline">
                            {profile.socialLinks.github}
                          </a>
                        )}
                      </div>

                      <div className="flex items-center">
                        <Twitter className="h-5 w-5 text-blue-400 mr-3" />
                        {editMode ? (
                          <input
                            type="text"
                            value={profile.socialLinks.twitter}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                socialLinks: { ...profile.socialLinks, twitter: e.target.value },
                              })
                            }
                            className="flex-1 bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                        ) : (
                          <a href="#" className="text-blue-400 hover:underline">
                            {profile.socialLinks.twitter}
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="experience">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Work Experience */}
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Work Experience</CardTitle>
                  {editMode && (
                    <button
                      onClick={handleAddExperience}
                      className="p-1 bg-pink-500 rounded-full hover:bg-pink-600 transition-colors"
                    >
                      <Plus className="h-4 w-4 text-white" />
                    </button>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {profile.experience.map((exp, index) => (
                      <div key={exp.id} className="relative">
                        {index < profile.experience.length - 1 && (
                          <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-gray-800"></div>
                        )}
                        <div className="flex">
                          <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0 z-10">
                            <Briefcase className="h-3 w-3 text-white" />
                          </div>
                          <div className="ml-4">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{exp.position}</h3>
                              {editMode && (
                                <button className="text-gray-400 hover:text-pink-500">
                                  <Edit className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                            <p className="text-sm text-pink-500">{exp.company}</p>
                            <p className="text-xs text-gray-400 mt-1">{exp.duration}</p>
                            <p className="text-sm text-gray-300 mt-2">{exp.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Education</CardTitle>
                  {editMode && (
                    <button
                      onClick={handleAddEducation}
                      className="p-1 bg-pink-500 rounded-full hover:bg-pink-600 transition-colors"
                    >
                      <Plus className="h-4 w-4 text-white" />
                    </button>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {profile.education.map((edu, index) => (
                      <div key={edu.id} className="relative">
                        {index < profile.education.length - 1 && (
                          <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-gray-800"></div>
                        )}
                        <div className="flex">
                          <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 z-10">
                            <Briefcase className="h-3 w-3 text-white" />
                          </div>
                          <div className="ml-4">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{edu.degree}</h3>
                              {editMode && (
                                <button className="text-gray-400 hover:text-pink-500">
                                  <Edit className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                            <p className="text-sm text-purple-500">{edu.school}</p>
                            <p className="text-xs text-gray-400 mt-1">{edu.year}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Certifications</CardTitle>
                  {editMode && (
                    <button className="p-1 bg-pink-500 rounded-full hover:bg-pink-600 transition-colors">
                      <Plus className="h-4 w-4 text-white" />
                    </button>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center h-32 border border-dashed border-gray-700 rounded-lg">
                    <Plus className="h-8 w-8 text-gray-500 mb-2" />
                    <p className="text-gray-500">Add certifications to enhance your profile</p>
                  </div>
                </CardContent>
              </Card>

              {/* Projects */}
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Projects</CardTitle>
                  {editMode && (
                    <button className="p-1 bg-pink-500 rounded-full hover:bg-pink-600 transition-colors">
                      <Plus className="h-4 w-4 text-white" />
                    </button>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center h-32 border border-dashed border-gray-700 rounded-lg">
                    <Plus className="h-8 w-8 text-gray-500 mb-2" />
                    <p className="text-gray-500">Add projects to showcase your work</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <div className="grid grid-cols-1 gap-8">
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Uploaded Documents</CardTitle>
                    <CardDescription>Documents that help your AI understand your work</CardDescription>
                  </div>
                  <button
                    onClick={handleAddDocument}
                    className="px-3 py-1 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-all duration-300 flex items-center text-sm"
                  >
                    <Upload className="h-4 w-4 mr-1" /> Upload Document
                  </button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {documents.length > 0 ? (
                      documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-800 hover:border-pink-500/20 transition-all duration-300"
                        >
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center mr-3">
                              <FileText className="h-5 w-5 text-pink-500" />
                            </div>
                            <div>
                              <h4 className="font-medium">{doc.name}</h4>
                              <div className="flex items-center text-xs text-gray-400">
                                <span>{doc.size}</span>
                                <span className="mx-2">•</span>
                                <span>{doc.uploadDate}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-400 hover:text-white transition-colors">
                              <Download className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleRemoveDocument(doc.id)}
                              className="p-1 text-gray-400 hover:text-pink-500 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center h-32 border border-dashed border-gray-700 rounded-lg">
                        <Upload className="h-8 w-8 text-gray-500 mb-2" />
                        <p className="text-gray-500">No documents uploaded yet</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Upload documents to help your AI understand your work
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                <CardHeader>
                  <CardTitle>Document Analysis</CardTitle>
                  <CardDescription>How your AI uses your documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Knowledge Extraction</h3>
                      <p className="text-sm text-gray-400">
                        Your AI analyzes your uploaded documents to extract knowledge, writing style, and expertise.
                        This helps it better represent you in communications and tasks.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Learning Progress</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Writing Style</span>
                            <span className="text-pink-500">78%</span>
                          </div>
                          <Progress value={78} className="h-1" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Technical Knowledge</span>
                            <span className="text-pink-500">65%</span>
                          </div>
                          <Progress value={65} className="h-1" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Domain Expertise</span>
                            <span className="text-pink-500">82%</span>
                          </div>
                          <Progress value={82} className="h-1" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-black/30 rounded-lg border border-pink-500/20">
                      <h4 className="font-medium flex items-center mb-2">
                        <Bot className="h-4 w-4 text-pink-500 mr-2" />
                        AI Insight
                      </h4>
                      <p className="text-sm text-gray-400">
                        Based on your documents, your AI has identified your expertise in product management, UX design,
                        and agile methodologies. Upload more documents to improve understanding.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                <CardHeader>
                  <CardTitle>AI Personality Settings</CardTitle>
                  <CardDescription>Customize how your AI represents you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium">Communication Style</label>
                      <select className="w-full mt-1 bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                        <option value="professional">Professional</option>
                        <option value="casual">Casual</option>
                        <option value="friendly">Friendly</option>
                        <option value="formal">Formal</option>
                        <option value="technical">Technical</option>
                      </select>
                      <p className="text-xs text-gray-400 mt-1">
                        Determines how your AI communicates in emails, messages, and documents.
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Response Length</label>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-400 mr-2">Concise</span>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value="3"
                          className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs text-gray-400 ml-2">Detailed</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Controls how detailed your AI's responses will be.</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Decision Making</label>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-400 mr-2">Conservative</span>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value="3"
                          className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs text-gray-400 ml-2">Decisive</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Affects how your AI makes decisions when handling tasks.
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Tone</label>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        <button className="px-3 py-2 bg-pink-500 text-white rounded-md">Neutral</button>
                        <button className="px-3 py-2 bg-black/30 border border-gray-700 rounded-md hover:border-pink-500/30 transition-colors">
                          Enthusiastic
                        </button>
                        <button className="px-3 py-2 bg-black/30 border border-gray-700 rounded-md hover:border-pink-500/30 transition-colors">
                          Serious
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Sets the emotional tone of your AI's communications.</p>
                    </div>

                    <button className="w-full cybr-btn">Save Personality Settings</button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                <CardHeader>
                  <CardTitle>AI Learning Settings</CardTitle>
                  <CardDescription>Control how your AI learns from your data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Continuous Learning</h4>
                        <p className="text-xs text-gray-400">Allow AI to learn from new interactions</p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-gray-800">
                        <input type="checkbox" className="sr-only" id="toggle-learning" defaultChecked />
                        <label htmlFor="toggle-learning" className="absolute inset-0 rounded-full cursor-pointer">
                          <span className="absolute inset-0 rounded-full bg-pink-500 transition-all duration-300 transform translate-x-0"></span>
                          <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 transform translate-x-6"></span>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Analysis</h4>
                        <p className="text-xs text-gray-400">Learn from your email communications</p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-gray-800">
                        <input type="checkbox" className="sr-only" id="toggle-email" defaultChecked />
                        <label htmlFor="toggle-email" className="absolute inset-0 rounded-full cursor-pointer">
                          <span className="absolute inset-0 rounded-full bg-pink-500 transition-all duration-300 transform translate-x-0"></span>
                          <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 transform translate-x-6"></span>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Document Analysis</h4>
                        <p className="text-xs text-gray-400">Learn from your documents and files</p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-gray-800">
                        <input type="checkbox" className="sr-only" id="toggle-docs" defaultChecked />
                        <label htmlFor="toggle-docs" className="absolute inset-0 rounded-full cursor-pointer">
                          <span className="absolute inset-0 rounded-full bg-pink-500 transition-all duration-300 transform translate-x-0"></span>
                          <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 transform translate-x-6"></span>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Calendar Integration</h4>
                        <p className="text-xs text-gray-400">Learn from your schedule and events</p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-gray-800">
                        <input type="checkbox" className="sr-only" id="toggle-calendar" />
                        <label htmlFor="toggle-calendar" className="absolute inset-0 rounded-full cursor-pointer">
                          <span className="absolute inset-0 rounded-full bg-gray-800 transition-all duration-300 transform translate-x-0"></span>
                          <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 transform translate-x-0"></span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Data Retention</h4>
                      <select className="w-full bg-black/50 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                        <option value="30">30 days</option>
                        <option value="90">90 days</option>
                        <option value="180" selected>
                          180 days
                        </option>
                        <option value="365">1 year</option>
                        <option value="forever">Forever</option>
                      </select>
                      <p className="text-xs text-gray-400 mt-1">How long your AI retains learning data.</p>
                    </div>

                    <button className="w-full neon-btn">Save Learning Settings</button>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-pink-500/30 transition-all duration-300 hologram">
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                  <CardDescription>Control your data and AI access</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Access Control</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-800">
                            <div>
                              <h5 className="font-medium">Email Access</h5>
                              <p className="text-xs text-gray-400">Allow AI to access your email</p>
                            </div>
                            <div className="relative inline-block w-10 h-5 rounded-full bg-gray-800">
                              <input type="checkbox" className="sr-only" id="toggle-email-access" defaultChecked />
                              <label
                                htmlFor="toggle-email-access"
                                className="absolute inset-0 rounded-full cursor-pointer"
                              >
                                <span className="absolute inset-0 rounded-full bg-pink-500 transition-all duration-300 transform translate-x-0"></span>
                                <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 transform translate-x-5"></span>
                              </label>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-800">
                            <div>
                              <h5 className="font-medium">Calendar Access</h5>
                              <p className="text-xs text-gray-400">Allow AI to access your calendar</p>
                            </div>
                            <div className="relative inline-block w-10 h-5 rounded-full bg-gray-800">
                              <input type="checkbox" className="sr-only" id="toggle-calendar-access" defaultChecked />
                              <label
                                htmlFor="toggle-calendar-access"
                                className="absolute inset-0 rounded-full cursor-pointer"
                              >
                                <span className="absolute inset-0 rounded-full bg-pink-500 transition-all duration-300 transform translate-x-0"></span>
                                <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 transform translate-x-5"></span>
                              </label>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-800">
                            <div>
                              <h5 className="font-medium">Document Access</h5>
                              <p className="text-xs text-gray-400">Allow AI to access your documents</p>
                            </div>
                            <div className="relative inline-block w-10 h-5 rounded-full bg-gray-800">
                              <input type="checkbox" className="sr-only" id="toggle-doc-access" defaultChecked />
                              <label
                                htmlFor="toggle-doc-access"
                                className="absolute inset-0 rounded-full cursor-pointer"
                              >
                                <span className="absolute inset-0 rounded-full bg-pink-500 transition-all duration-300 transform translate-x-0"></span>
                                <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 transform translate-x-5"></span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Data Management</h4>
                        <div className="space-y-4">
                          <button className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-md hover:border-pink-500/30 transition-colors text-left flex items-center">
                            <Download className="h-4 w-4 text-pink-500 mr-2" />
                            Download Your Data
                          </button>

                          <button className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-md hover:border-pink-500/30 transition-colors text-left flex items-center">
                            <Trash2 className="h-4 w-4 text-pink-500 mr-2" />
                            Delete Learning Data
                          </button>

                          <button className="w-full px-4 py-2 bg-black/50 border border-red-500/30 rounded-md hover:border-red-500/50 transition-colors text-left flex items-center">
                            <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                            Reset AI Completely
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-black/30 rounded-lg border border-pink-500/20">
                      <h4 className="font-medium flex items-center mb-2">
                        <Shield className="h-4 w-4 text-pink-500 mr-2" />
                        Privacy Notice
                      </h4>
                      <p className="text-sm text-gray-400">
                        Your data is securely stored and only used to train your personal AI. We never share your data
                        with third parties or use it to train other AI models.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
