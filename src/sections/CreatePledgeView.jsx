/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable eqeqeq */
import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom';

// import { makeStyles } from '@mui/styles'
import { Button, Typography } from '@mui/material'

import { pledges } from '../_mock/pledges'

class Pledge {    
    constructor(GRI, pledge, deadline, howWeGetThere) {
        this.UID = Math.floor(Math.random() * 10 ** 15);
        this.GRI = GRI;
        this.pledge = pledge;
        this.deadline = deadline;
        this.howWeGetThere = howWeGetThere;
    }
}

function CreatePledgeView() {
    let successful = true
    let createdPledge;
    
    const [goal, setGoal] = useState("");
    const [selectedGRI, setSelectedGRI] = useState("");
    const [step1, setStep1] = useState("");
    const [step2, setStep2] = useState("");
    const [step3, setStep3] = useState("");
    const [step4, setStep4] = useState("");
    const [step5, setStep5] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSectors, setSelectedSectors] = useState([]);
    
    const griStandards = [
        "301: Materials",
        "302: Energy",
        "303: Water and Effluents",
        "304: Biodiversity",
        "305: Emissions",
        "306: Waste",
        "307: Environmental Compliance",
        "308: Supplier Environmental Assessment"
    ];
    const handleSelectionChange = (event) => {
        setSelectedGRI(event.target.value);
    };

    // Calculate the minimum and maximum dates
    const today = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() + 5);
  
    const formatDate = (date) => {
      let month = `${  date.getMonth() + 1}`;
          let day = `${  date.getDate()}`;
          const year = date.getFullYear();
  
      if (month.length < 2) month = `0${  month}`;
      if (day.length < 2) day = `0${  day}`;
  
      return [year, month, day].join('-');
    };
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const sectors = [
        "Agriculture & Resources",
        "Mining & Extraction",
        "Manufacturing",
        "Utilities",
        "Construction",
        "Wholesale Trade",
        "Retail Trade",
        "Transport & Warehousing",
        "ICT",
        "Finance & Insurance",
        "Real Estate",
        "Professional Services",
    ];
    const handleSectorChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        setSelectedSectors(selectedOptions);
    };

    const navigate = useNavigate();

    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/pledges");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        successful = true

        // Checking that there's a goal
        if (goal == "") {
            alert("Set your goal!")
            successful = false
        }

        if (successful && selectedGRI == "") {
            alert("Choose the GRI that best defines your goal.")
            successful = false
        }

        // Five steps and all that jazz
        if (successful && step1 == "" || step2 == "" || step3 == "" || step4 == "" || step5 == "") {
            alert("Set five steps that your company is going take towards reaching your goal. The more detailed, the better!")
            successful = false
        }

        // Check date's been selected
        if (successful && selectedDate == "") {
            alert("Set a date to achieve your goal by!")
            successful = false
        }

        // 1 <= sectors <= 4
        // eslint-disable-next-line eqeqeq
        if (successful && selectedSectors.length == 0) {
            alert('Select at least one sector that your business fits into.');
            successful = false
        } else if (successful && selectedSectors.length > 4) {
            alert('You cannot select more than four sectors.');
            successful = false
        }

        if (successful) {
            createdPledge = new Pledge(
                selectedGRI,
                goal,
                new Date(selectedDate),
                {step1, step2, step3, step4, step5}
            )
            createdPledge.addSectors(selectedSectors)
            pledges.push(createdPledge)
            alert("You have successfully made a new pledge!")
            navigate("/pledges");
        }
    };

    return (
        <form>
            <Typography variant="body1" component="p">
                What is your goal?
            </Typography>
            <input
                type="text" 
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
            />

            <Typography variant="body1" component="p">
                Choose a GRI Content Index:
            </Typography>
            <select id="gri-select" value={selectedGRI} onChange={handleSelectionChange}>
                <option value="">--Please choose an option--</option>
                {griStandards.map((content, index) => (
                    <option key={index} value={content}>{content}</option>
                ))}
            </select>

            <Typography variant="body1" component="p">
                What steps is your company to take towards its goal?
            </Typography>
            <Typography variant="body1" component="p">
                1:
            </Typography>
            <input
                type="text" 
                value={step1}
                onChange={(e) => setStep1(e.target.value)}
            />
            <Typography variant="body1" component="p">
                2:
            </Typography>
            <input
                type="text" 
                value={step2}
                onChange={(e) => setStep2(e.target.value)}
            />
            <Typography variant="body1" component="p">
                3:
            </Typography>
            <input
                type="text" 
                value={step3}
                onChange={(e) => setStep3(e.target.value)}
            />
            <Typography variant="body1" component="p">
                4:
            </Typography>
            <input
                type="text" 
                value={step4}
                onChange={(e) => setStep4(e.target.value)}
            />
             <Typography variant="body1" component="p">
                5:
            </Typography>
            <input
                type="text" 
                value={step5}
                onChange={(e) => setStep5(e.target.value)}
            />

            <Typography variant="body1" component="p">
                Choose a date within the next five years; setting short-term goals will get you far!
            </Typography>
            <input 
                type="date" 
                id="date-select" 
                value={selectedDate}
                min={formatDate(today)} 
                max={formatDate(maxDate)} 
                onChange={handleDateChange} 
            />

            <Typography variant="body1" component="p">
                What realm(s) of the economy does your business fall under?
            </Typography>
            <select id="sector-select" multiple={true} value={selectedSectors} onChange={handleSectorChange} size={sectors.length}>
                {sectors.map((sector, index) => (
                    <option key={index} value={sector}>{sector}</option>
                ))}
            </select>

            <Button onClick={handleSubmit}>
                Make the Pledge!
            </Button>

            <Button onClick={handleCancel}>
                Cancel
            </Button>
        </form>
    )
}

export default CreatePledgeView;