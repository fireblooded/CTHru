class Pledge {    
    constructor(GRI, pledge, deadline, howWeGetThere) {
        this.UID = Math.floor(Math.random() * 10 ** 15);
        this.GRI = GRI;
        this.pledge = pledge;
        this.deadline = deadline;
        this.howWeGetThere = howWeGetThere;
        this.sectors = null;
    }

    addSectors(newSectors) {
        this.sectors = newSectors;
    }
}

export const pledges = [
    new Pledge(
        "GRI 303: Water and Effluents",
        "We will reduce our water usage by 20%.",
        new Date("2027-04-09"),
        [
            "We will conduct a thorough audit of our current water usage to identify inefficiencies and areas for improvement. Based on the audit findings, we will upgrade our infrastructure to include water-saving technologies such as low-flow fixtures in restrooms, efficient cooling systems, and water-smart landscaping. This step will help in significantly reducing our baseline water consumption.",
            "We will invest in advanced water recycling systems to treat and reuse water within our operations. This can include the installation of on-site water recycling plants for processes that require non-potable water, significantly reducing our demand for fresh water.",
            "We will launch a company-wide awareness campaign to educate our employees about the importance of water conservation and how they can contribute both at work and at home. Training programs will be developed to ensure that all employees are equipped with the knowledge to implement water-saving practices in their respective roles.",
            "We will work closely with our suppliers to ensure they are aligned with our water conservation goals, encouraging them to adopt similar water-saving practices. Additionally, we will engage with the local community and other businesses to share best practices and develop joint initiatives aimed at broader water conservation efforts in the areas we operate.",
            "We will establish a system for monitoring our water usage in real-time, allowing for the immediate identification of leaks and inefficiencies. Regular reporting on our water consumption will be instituted to track progress towards our goal. This data will be used to continuously refine our strategies and practices, ensuring we remain on track to meet our 20% reduction target by April 2027."
        ]
    )]
/*
export const pledges = pledgeList.map((eachPledge) => ({
    uid: eachPledge.UID,
    GRI: eachPledge.GRI,
    pledge: eachPledge.pledge,
    deadline: eachPledge.deadline
}))
*/