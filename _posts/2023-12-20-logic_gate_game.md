---
toc: true
comments: false
layout: post
title: Logic Gate Game
description: A game for understanding how logic gates work
type: ccc
courses: { csp: {week: 21} }
---

<style>
    body
    {
        background-color: #004970 !important;
    }
    .gates
    {
        text-align: left;
    }
    .topBar
    {
        border: 5px solid #ffffff;
        border-radius: 20px;
        margin-bottom: 20px;
    }
    @keyframes fadeInOut {
        0%, 100% 
        {
            border-color: transparent;
        }
        50% 
        {
            border-color: #ffffff;
        }
    }
    .gates img
    {
        width: 150px;
        height: auto;
        display: inline-block;
        margin-right: 10px;
        cursor: move;
        border: 2px solid transparent;
        border-radius: 10px;
        transition: border 0.3s ease-in-out;
    }

    .gates img:hover
    {
        border: 2px solid #ffffff;
        animation: fadeInOut 2s infinite;
    }
    .topBar, .gates, .gates img 
    {
        padding: 5px;
    }
    .workArea
    {
        border: 5px dashed #ffffff;
        min-height: 500px; /* Set a minimum height for the work area */
        padding: 10px;
        position: relative;
    }
</style>
<div class="topBar">
    <p style="text-align: center">Logic Gate Store</p>
    <div class="gates">
        <img id= "and_gate" src="{{site.baseurl}}/images/and_gate.png">
        <img id= "nand_gate" src="{{site.baseurl}}/images/nand_gate.png">
        <img id= "or_gate" src="{{site.baseurl}}/images/or_gate.png">
        <img id= "nor_gate" src="{{site.baseurl}}/images/nor_gate.png">
        <img id= "xnor_gate" src="{{site.baseurl}}/images/xnor_gate.png">
    </div>
</div>

<div class="workArea">
    <!-- Work area content will be dynamically added here -->
</div>

<script>
    var cloneId = 0;

    document.addEventListener("DOMContentLoaded", function () 
    {
        var draggables = document.querySelectorAll('.gates img');
        var workArea = document.querySelector('.workArea');

        draggables.forEach(function (draggable) 
        {
            draggable.addEventListener('dragstart', function(event) 
            {
                event.dataTransfer.setData('text', event.target.id);
            });
        });

        workArea.addEventListener('dragover', function (event) {
            event.preventDefault();
        });

        workArea.addEventListener('drop', function (event) {
            event.preventDefault();
            var data = event.dataTransfer.getData('text');
            var draggedElement = document.getElementById(data);

            // Create a clone of the dragged element and append it to the work area
            var clone = draggedElement.cloneNode(true);
            clone.id = data.replace(/\d/g, '') + cloneId; // Add a unique id to the clone
            cloneId++;

            // Calculate the position based on mouse coordinates
            var offsetX = event.clientX - workArea.getBoundingClientRect().left;
            var offsetY = event.clientY - workArea.getBoundingClientRect().top;

            clone.style.position = 'absolute';
            clone.style.width = draggedElement.width + 'px'; // Set width of the clone
            clone.style.height = draggedElement.height + 'px'; // Set height of the clone
            clone.style.left = offsetX - (draggedElement.width / 2) + 'px';
            clone.style.top = offsetY - (draggedElement.height / 2) + 'px';

            clone.addEventListener('dragstart', function(cloneEvent)
            {
                cloneEvent.dataTransfer.setData('text', cloneEvent.target.id);
            });

            clone.addEventListener('dragend', function(cloneEvent) 
            {
                // Remove the old cloned image
                let oldClone = cloneEvent.toElement;

                if (oldClone) 
                {
                    let parentElement = oldClone.parentNode;
                    parentElement.removeChild(oldClone);
                }
            });

            workArea.appendChild(clone);
        });
    });
</script>